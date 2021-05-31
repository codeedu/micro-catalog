import './bootstrap';
import * as commands from './commands';
import {default as chalk} from 'chalk';

const command = process.argv[2] || null;

if (!command) {
  showAvailableCommands();
}

const commandKey: string = Object.keys(commands).find(
  (c) => (commands as any)[c].command === command,
)!;

if (!commandKey) {
  showAvailableCommands();
}

const commandInstance = new (commands as any)[commandKey]();

//console.dir(error, {depth: 5})
commandInstance.run().catch(console.error);

function showAvailableCommands() {
  console.log(chalk.green('Loopback Console'));
  console.log('');
  console.log(chalk.green('Available commands'));
  console.log('');
  for (const c of Object.keys(commands)) {
    console.log(
      `- ${chalk.green((commands as any)[c].command)} - ${
        (commands as any)[c].description
      }`,
    );
  }
  console.log('');
  process.exit();
}
