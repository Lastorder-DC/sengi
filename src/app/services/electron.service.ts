import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MyElectronService {
    constructor() {
    }

    setLang(lang: string) {
        try {
            if ((<any>window).api) {
                (<any>window).api.send("changeSpellchecker", lang);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}
