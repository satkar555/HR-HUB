"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseProvider = void 0;
const admin = require("firebase-admin");
const config_1 = require("@nestjs/config");
const configService = new config_1.ConfigService();
exports.firebaseProvider = {
    provide: 'FIREBASE_APP',
    useFactory: () => {
        const firebaseConfig = {};
        console.log('firebaseConfig', firebaseConfig);
        return admin.initializeApp({
            credential: admin.credential.cert({
                type: configService.get('firebase_type'),
                project_id: configService.get('firebase_project_id'),
                private_key_id: configService.get('firebase_private_key_id'),
                private_key: configService.get('firebase_private_key'),
                client_email: configService.get('firebase_client_email'),
                client_id: configService.get('firebase_client_id'),
                auth_uri: configService.get('firebase_auth_uri'),
                token_uri: configService.get('firebase_token_uri'),
                auth_provider_x509_cert_url: configService.get('firebase_auth_provider_x509_cert_url'),
                client_x509_cert_url: configService.get('firebase_client_x509_cert_url'),
                universe_domain: configService.get('firebase_universe_domain'),
            }),
            databaseURL: `https://${firebaseConfig.project_id}.firebaseio.com`,
            storageBucket: `${firebaseConfig.project_id}.appspot.com`,
        });
    },
};
//# sourceMappingURL=firebase.provider.js.map