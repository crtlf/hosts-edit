'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  config: {
    "path": {
      "win32": "%SYSTEM%/drivers/etc/hosts",
      "darwin": "/private/etc/hosts",
      "linux": "/etc/hosts",
    },
    "customPath" : {
      "description": "By default, the plugin looks for the hosts file default location of your OS, but you can override it. (Leave blank to keep the default configuration)",
      "type": "string",
      "default": "",
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
    var path = this.config.path[process.platform];
    if (atom.config.get('hosts-edit.customPath') !== '') {
      path = atom.config.get('hosts-edit.customPath');
    }
    return atom.workspace.open(path);
  }

};
