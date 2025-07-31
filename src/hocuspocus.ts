import { Hocuspocus } from '@hocuspocus/server';


export function startHocuspocusServer() {
    const server = new Hocuspocus({
        port: 1234,
        name: 'Hocuspocus Server',
        async onConnect(context) {
            console.log(`[Hocuspocus] Client connected to document: ${context.documentName}`);
        },
        async onLoadDocument({ documentName }) {
            console.log(`[Hocuspocus] Loading document: ${documentName}`);
            // You can load document data from DB or Redis here
        },
    })

    server.listen()
}