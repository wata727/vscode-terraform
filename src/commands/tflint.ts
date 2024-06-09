/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TelemetryReporter from '@vscode/extension-telemetry';
import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';
import * as terraform from '../terraform';

export class TFLintCommands implements vscode.Disposable {
  private commands: vscode.Disposable[];

  constructor(private client: LanguageClient, private reporter: TelemetryReporter) {
    this.commands = [
      vscode.commands.registerCommand('terraform.tflint', async () => {
        await terraform.tflint(this.client, this.reporter);
      }),
    ];
  }

  dispose() {
    this.commands.forEach((c) => c.dispose());
  }
}
