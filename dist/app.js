"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const $ = cheerio.load;
const scrapeSDHumanSociety = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto(url);
        yield page.waitForSelector('.pet-item', { timeout: 10000 });
        const data = yield page.evaluate(() => {
            var _a;
            return (_a = document.querySelector('#animalGallery')) === null || _a === void 0 ? void 0 : _a.innerHTML;
        });
        yield browser.close();
        if (!data) {
            throw new Error('No animals found');
        }
        const $ = cheerio.load(data);
        const animals = $('.pet-item');
        animals.each((i, el) => {
            const animal = {
                name: '',
                type: '',
                breed: '',
                sex: '',
                url: '',
                location: '',
                imageUrl: '',
                organization: 'San Diego Human Society',
                organizationUrl: 'https://www.sdhumane.org',
                organizationPhoneNumber: '619-299-7012'
            };
            animal.name = $(el).find('.pet-info').find('h6').find('.petName').text() || '';
            animal.type = $(el).find('.pet-info').find('.pet-type').text() || '';
            animal.breed = $(el).find('.pet-info').find('.breed').text() || '';
            animal.sex = $(el).find('.pet-info').find('.gender').text() || '';
            animal.url = $(el).find('.pet-info').find('.learnMore').attr('href') || '';
            animal.imageUrl = $(el).find('.thumbnail').find('img').attr('src') || '';
            console.log(animal);
        });
        // console.log(animals)
    }
    catch (err) {
        console.log('ERROR: ', err);
    }
});
scrapeSDHumanSociety('https://www.sdhumane.org/adopt/available-pets/');
//# sourceMappingURL=app.js.map