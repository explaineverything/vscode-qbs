import * as vscode from 'vscode';

// From user code.
import {QbsSessionTaskStartedResult,
        QbsSessionMessageResult,
        QbsSessionProcessResult} from './qbssessionresults';

export class QbsSessionLogger implements vscode.Disposable {
    // Private members.
    private _compileOutput: vscode.OutputChannel;

    // Constructors.

    constructor(readonly extensionContext: vscode.ExtensionContext) {
        this._compileOutput = vscode.window.createOutputChannel('QBS');
    }

    // Public overriden methods.

    dispose() {  }

    // Public methods.

    handleTaskStarted(result: QbsSessionTaskStartedResult) {
        this._compileOutput.appendLine(result._description);
    }

    handleProjectResolved(result: QbsSessionMessageResult) {
        if (result.hasError()) {
            this._compileOutput.appendLine(result.toString());
        }
    }

    handleProjectBuilt(result: QbsSessionMessageResult) {
        if (result.hasError()) {
            this._compileOutput.appendLine(result.toString());
        }
    }

    handleProjectCleaned(result: QbsSessionMessageResult) {
        if (result.hasError()) {
            this._compileOutput.appendLine(result.toString());
        }
    }

    handleProjectInstalled(result: QbsSessionMessageResult) {
        if (result.hasError()) {
            this._compileOutput.appendLine(result.toString());
        }
    }

    handleCommandDesctiptionReceived(result: QbsSessionMessageResult) {
        if (result.hasError()) {
            this._compileOutput.appendLine(result.toString());
        }
    }

    handleProcessResultReceived(result: QbsSessionProcessResult) {
        const hasOutput = result._stdOutput.length > 0 || result._stdError.length > 0;
        if (result._success && !hasOutput) {
            return;
        }

        const shellExe = result._executable + ' ' + result._arguments.join(' ');
        this._compileOutput.appendLine(shellExe);

        if (result._stdError.length > 0) {
            this._compileOutput.appendLine(result._stdError.join('\n'));
        }
        if (result._stdOutput.length > 0) {
            this._compileOutput.appendLine(result._stdOutput.join('\n'));
        }
    }
}
