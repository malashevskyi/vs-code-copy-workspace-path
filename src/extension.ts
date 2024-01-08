import * as vscode from "vscode";

const getConfiguration = () => {
  const config = vscode.workspace.getConfiguration("copy-workspace-path");

  return {
    cd: config.get<boolean>("add cd") || false,
    quotes: config.get<boolean>("path quotes") || false,
  };
};

const copyPath = (workspacePath: string) => {
  const { quotes, cd } = getConfiguration();

  const normalizedWorkspacePath = quotes ? `'${workspacePath}'` : workspacePath;

  if (cd) {
    vscode.env.clipboard.writeText(`cd ${normalizedWorkspacePath}`);
  } else {
    vscode.env.clipboard.writeText(normalizedWorkspacePath);
  }

  vscode.window.showInformationMessage(`The path copied! ${workspacePath}`);
};

export function activate(context: vscode.ExtensionContext) {
  const [workspace] = vscode.workspace.workspaceFolders || [];

  if (!workspace) {
    return vscode.window.showInformationMessage(
      "Could not copy. It seems that no project is open.",
    );
  }
  const {
    uri: { fsPath: workspacePath },
  } = workspace;

  context.subscriptions.push(
    vscode.commands.registerCommand("copy-workspace-path.copy-path", () =>
      copyPath(workspacePath),
    ),
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
