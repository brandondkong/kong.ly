#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { spawnSync } from "node:child_process";

import { cancel, intro, isCancel, log, outro, select, spinner, text } from "@clack/prompts";
import { downloadTemplate } from "giget";
import pc from "picocolors";

const TEMPLATE_REPO = "github:brandondkong/docs#main";

type PackageManager = "bun" | "pnpm" | "npm" | "yarn";
const CANDIDATE_PMS: PackageManager[] = ["bun", "pnpm", "npm", "yarn"];

function bail(message: string, code = 1): never {
    cancel(message);
    process.exit(code);
}

function hasBin(name: string): boolean {
    const result = spawnSync(name, ["--version"], {
        stdio: "ignore",
        shell: process.platform === "win32",
    });
    return result.status === 0;
}

function detectPackageManagers(): PackageManager[] {
    return CANDIDATE_PMS.filter(hasBin);
}

function parsePositional(argv: string[]): string | undefined {
    return argv.find((arg) => !arg.startsWith("-"));
}

async function promptTarget(initial?: string): Promise<string> {
    if (initial) return initial;
    const answer = await text({
        message: "Where should we create your docs site?",
        placeholder: "./my-docs",
        defaultValue: "./my-docs",
        validate: (value) => (value.trim().length === 0 ? "Please enter a path." : undefined),
    });
    if (isCancel(answer)) bail("Scaffold cancelled.");
    return answer as string;
}

async function promptProjectName(defaultName: string): Promise<string> {
    const answer = await text({
        message: "What should the project be named?",
        placeholder: defaultName,
        defaultValue: defaultName,
        validate: (value) => {
            if (value.trim().length === 0) return "Please enter a name.";
            if (!/^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(value)) {
                return "Invalid npm package name.";
            }
            return undefined;
        },
    });
    if (isCancel(answer)) bail("Scaffold cancelled.");
    return answer as string;
}

async function promptPackageManager(available: PackageManager[]): Promise<PackageManager | null> {
    if (available.length === 0) {
        log.warn("No package manager detected on PATH. Skipping dependency install.");
        return null;
    }
    if (available.length === 1) {
        log.info(`Using ${pc.cyan(available[0])} (only detected package manager).`);
        return available[0];
    }
    const choice = await select({
        message: "Which package manager would you like to use?",
        options: available.map((pm) => ({ value: pm, label: pm })),
        initialValue: available[0],
    });
    if (isCancel(choice)) bail("Scaffold cancelled.");
    return choice as PackageManager;
}

function ensureEmptyDir(dir: string): void {
    if (!existsSync(dir)) return;
    const entries = readdirSync(dir);
    if (entries.length > 0) {
        bail(`Target directory ${pc.cyan(dir)} is not empty. Aborting.`);
    }
}

async function fetchTemplate(target: string): Promise<void> {
    const s = spinner();
    s.start("Downloading template");
    try {
        await downloadTemplate(TEMPLATE_REPO, {
            dir: target,
            force: true,
            preferOffline: false,
        });
        s.stop("Template downloaded.");
    } catch (error) {
        s.stop("Failed to download template.");
        const message = error instanceof Error ? error.message : String(error);
        bail(message);
    }
}

function rewritePackageName(targetDir: string, projectName: string): void {
    const pkgPath = resolve(targetDir, "package.json");
    if (!existsSync(pkgPath)) return;
    const raw = readFileSync(pkgPath, "utf-8");
    const pkg = JSON.parse(raw) as { name?: string };
    pkg.name = projectName;
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 4)}\n`);
}

function runInstall(pm: PackageManager, cwd: string): void {
    const s = spinner();
    s.start(`Installing dependencies with ${pm}`);
    const result = spawnSync(pm, ["install"], {
        cwd,
        stdio: "ignore",
        shell: process.platform === "win32",
    });
    if (result.status !== 0) {
        s.stop(`Install failed with ${pm}.`);
        bail(`Run \`${pm} install\` manually inside ${pc.cyan(cwd)}.`, result.status ?? 1);
    }
    s.stop("Dependencies installed.");
}

function devCommand(pm: PackageManager | null): string {
    if (!pm) return "<pm> install\n  <pm> dev";
    if (pm === "npm") return "npm run dev";
    return `${pm} dev`;
}

async function main(): Promise<void> {
    intro(pc.bgCyan(pc.black(" create-kongly-docs ")));

    const argv = process.argv.slice(2);
    const positional = parsePositional(argv);
    const targetArg = await promptTarget(positional);
    const targetDir = resolve(process.cwd(), targetArg);

    ensureEmptyDir(targetDir);

    const projectName = await promptProjectName(basename(targetDir));
    const available = detectPackageManagers();
    const pm = await promptPackageManager(available);

    await fetchTemplate(targetDir);
    rewritePackageName(targetDir, projectName);

    if (pm) runInstall(pm, targetDir);

    const relative = targetArg.startsWith(".") ? targetArg : `./${targetArg}`;
    outro(
        [
            pc.green("Your docs site is ready."),
            "",
            "Next steps:",
            `  ${pc.cyan(`cd ${relative}`)}`,
            `  ${pc.cyan(devCommand(pm))}`,
        ].join("\n"),
    );
}

main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    log.error(message);
    process.exit(1);
});
