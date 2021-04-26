import {config as loadenv} from 'dotenv';
import {join} from 'path';

loadenv({path: join(__dirname, '../.env')});
