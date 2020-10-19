function resolveRun(exitCode, stdout, stderr) {
    stdout = stdout && stdout.toString();
    stderr = stderr && stderr.toString();

    if (exitCode !== 0) {
        return Object.assign(new Error(`Command failed, exited with code #${exitCode}`), {
            exitCode,
            stdout,
            stderr,
        });
    }

    return {
        stdout,
        stderr,
    };
}

function runSync(syncRunner, command, args, options) {
    const {error, status, stdout, stderr} = syncRunner(command, args, options);

    if (error) {
        throw error;
    }

    const resolved = resolveRun(status, stdout, stderr);

    if (resolved instanceof Error) {
        throw resolved;
    }

    return resolved;
}

module.exports = runSync;
