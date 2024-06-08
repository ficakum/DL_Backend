"use strict";
// import * as Jimp from "jimp";
// import * as path from "path";
// import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as tf from "@tensorflow/tfjs-node";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// const image = async () => {
//   const model: mobilenet.MobileNet = await mobilenet.load();
//   const imagePath = path.join(__dirname, "111085122871_0.JPG");
//   const image = await Jimp.read(imagePath);
//   const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
//   const decodedImage: tf.Tensor3D = tf.node.decodeImage(buffer) as tf.Tensor3D;
//   // Get image embeddings
//   const embeddings: tf.Tensor<tf.Rank> = model.infer(
//     decodedImage,
//     true
//   ) as tf.Tensor;
//   // Convert embeddings to a JSON-serializable format
//   const embeddingData = embeddings.arraySync() as number[]; // Flatten the tensor to an array
//   const shape = embeddings.shape; // Get the shape of the tensor
//   console.log(embeddingData);
//   console.log(shape);
// };
// image();
var fs = require("fs");
var Jimp = require("jimp");
var path = require("path");
var mobilenet = require("@tensorflow-models/mobilenet");
var tf = require("@tensorflow/tfjs-node");
var processImages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var model, imagesDir, imageFiles, results, _i, imageFiles_1, file, imagePath, image, buffer, decodedImage, embeddings, embeddingData, shape;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mobilenet.load()];
            case 1:
                model = _a.sent();
                imagesDir = path.join(__dirname, "images");
                imageFiles = fs.readdirSync(imagesDir);
                results = [];
                _i = 0, imageFiles_1 = imageFiles;
                _a.label = 2;
            case 2:
                if (!(_i < imageFiles_1.length)) return [3 /*break*/, 6];
                file = imageFiles_1[_i];
                imagePath = path.join(imagesDir, file);
                return [4 /*yield*/, Jimp.read(imagePath)];
            case 3:
                image = _a.sent();
                return [4 /*yield*/, image.getBufferAsync(Jimp.MIME_JPEG)];
            case 4:
                buffer = _a.sent();
                decodedImage = tf.node.decodeImage(buffer);
                embeddings = model.infer(decodedImage, true);
                embeddingData = embeddings.arraySync();
                shape = embeddings.shape;
                results.push({
                    image: file,
                    embeddings: embeddingData,
                    shape: shape,
                });
                // Clean up the tensor to release memory
                embeddings.dispose();
                decodedImage.dispose();
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                // Save the results to a JSON file
                fs.writeFileSync(path.join(__dirname, "image_embeddings.json"), JSON.stringify(results, null, 2));
                return [2 /*return*/];
        }
    });
}); };
processImages()
    .then(function () {
    console.log("Image processing complete.");
})
    .catch(function (err) {
    console.error("Error processing images:", err);
});
