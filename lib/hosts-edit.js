'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  config: {
    "path": {
      "win32": "%SYSTEM%/drivers/etc/hosts",
      "darwin": "/private/etc/hosts",
      "linux": "/etc/hosts",
    }
  },

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hosts-edit:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
    return atom.workspace.open(this.config.path[process.platform]);
  }

};
