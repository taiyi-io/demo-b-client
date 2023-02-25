import { NewConnectorFromAccess, ChainConnector } from "@taiyi-io/chain-connector";
import path from 'path';
import { promises as fs } from 'fs';

import npmPackage from '../package.json';

export default class ChainProvider{
    static async connect(): Promise<ChainConnector> {
        const {host, port, debug, project} = npmPackage.chain;
        const filePath = path.join(process.cwd(), 'access_key.json');
        const content = await fs.readFile(filePath, 'utf8');
        let conn = NewConnectorFromAccess(JSON.parse(content));
        if (project){
            conn.setProjectName(project);
        }    
        if (debug){
            conn.Trace = true;
        }
        await conn.connect(host, port);
        return conn;
    }
}