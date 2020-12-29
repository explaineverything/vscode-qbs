import * as vscode from 'vscode';

import * as QbsDiagnosticUtils from './qbsdiagnosticutils';

import {QbsMessageItemResponse} from '../datatypes/qbsmessageresponse';

import {QbsDiagnosticParser} from './qbsdiagnosticutils';

export class QbsQbsDiagnosticParser extends QbsDiagnosticParser {
    constructor() {
        super('qbs');
    }

    parseLines(lines: string[]) {
        // We don't use this method for current parser.
    }

    parseMessages(messages: QbsMessageItemResponse[]) {
        for (const message of messages) {
            this.parseMessage(message);
        }
    }

    private parseMessage(message: QbsMessageItemResponse) {
        const lineno = QbsDiagnosticUtils.substractOne(message._line);
        const column = QbsDiagnosticUtils.substractOne(message._column);
        const range = new vscode.Range(lineno, column, lineno, 999);

        const diagnostic: vscode.Diagnostic = {
            source: this.type(),
            severity: vscode.DiagnosticSeverity.Warning,
            message: message._description,
            range
        };

        this.insertDiagnostic(message._filePath, diagnostic);
    }
}
