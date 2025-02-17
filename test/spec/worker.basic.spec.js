import { spec, it, beforeAll } from "simp-spec";
import { expect } from "chai";
import { TEST_CONFIG } from "../configs/test.config";
import QuickWebAssembly from "../../src/index"


export default spec("QuickWebAssembly In Worker test", function() {
    let fibManager;
    beforeAll(async done => {
        debugger
        fibManager = await QuickWebAssembly.createInWorker({
            moduleUrl: `${TEST_CONFIG.assetsPath}/out.js`,
            wasmUrl: `${TEST_CONFIG.assetsPath}/out.wasm`,
            worker: new Worker(new URL("../../dist/worker.js", import.meta.url))
        });
        done();
    });

    it("basic use", async done => {
        expect(await fibManager.fib(12)).eq(233)
        await fibManager.greet("hello");
        let ptr = await fibManager.createHEAP8(new Int8Array([1,2,3]));
        await fibManager.printInt8Array(ptr, 3);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.createHEAP16(new Int16Array([1,2,3]));
        await fibManager.printInt16Array(ptr, 3);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.createHEAP32(new Int32Array([1,2,3]));
        await fibManager.printInt32Array(ptr, 3);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.createHEAPF32(new Float32Array([1.0,2.0,3.0]));
        await fibManager.printFloat32Array(ptr, 3);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.createHEAPF64(new Float64Array([1,2,3]));
        await fibManager.printFloat64Array(ptr, 3);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.createHEAPU8(new Uint8Array([-1,2,3]));
        await fibManager.printUInt8Array(ptr, 3);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.createHEAPU16(new Uint16Array([-1,2,3]));
        await fibManager.printUInt16Array(ptr, 3);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.createHEAPU32(new Uint32Array([-1,2,3]));
        await fibManager.printUInt32Array(ptr, 3);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.createHEAP(new Int8Array([1,2,3]).buffer);
        await fibManager.printInt8Array(ptr, 3);
        const buffer = await fibManager.getHEAP(ptr, 3);
        expect(buffer instanceof ArrayBuffer).ok;
        const getInt8 = new Int8Array(buffer);
        expect(getInt8[0]+getInt8[1]+getInt8[2]).eq(6);
        await fibManager.freeHEAP(ptr);
        ptr = await fibManager.mockRandom(10);
        const heap = await fibManager.getHEAPF32(ptr, 10);
        expect(heap instanceof Float32Array).true;
        expect(heap.length).eq(10);
        console.log(heap);
        done();
    });
});
