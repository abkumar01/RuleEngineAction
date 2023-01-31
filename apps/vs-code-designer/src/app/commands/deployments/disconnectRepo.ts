/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { ext } from '../../../extensionVariables';
import { SlotTreeItemBase } from '../../tree/slotsTree/SlotTreeItemBase';
import { DeploymentsTreeItem, disconnectRepo as disconnectRepository } from '@microsoft/vscode-azext-azureappservice';
import type { IActionContext } from '@microsoft/vscode-azext-utils';

export async function disconnectRepo(context: IActionContext, node?: DeploymentsTreeItem): Promise<void> {
  if (!node) {
    node = await ext.tree.showTreeItemPicker<DeploymentsTreeItem>(DeploymentsTreeItem.contextValueConnected, context);
  }

  if (node.parent instanceof SlotTreeItemBase) {
    await disconnectRepository(context, node.site, node.subscription);
    await node.refresh(context);
  } else {
    throw Error('Internal error: Action not supported.');
  }
}