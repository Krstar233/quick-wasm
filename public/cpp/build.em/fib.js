var Module=typeof Module!="undefined"?Module:{};var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}process.on("uncaughtException",function(ex){if(ex!=="unwind"&&!(ex instanceof ExitStatus)&&!(ex.context instanceof ExitStatus)){throw ex}});var nodeMajor=process.versions.node.split(".")[0];if(nodeMajor<15){process.on("unhandledRejection",function(reason){throw reason})}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="fib.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(binaryFile)){return fetch(binaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(binaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(binaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(binaryFile)})}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(function(binary){return WebAssembly.instantiate(binary,imports)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!isFileURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}else{return instantiateArrayBuffer(binaryFile,imports,callback)}}function createWasm(){var info={"a":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["e"];updateMemoryViews();wasmTable=Module["asm"]["s"];addOnInit(Module["asm"]["f"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function _emscripten_date_now(){return Date.now()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function abortOnCannotGrowMemory(requestedSize){abort("OOM")}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;abortOnCannotGrowMemory(requestedSize)}var printCharBuffers=[null,[],[]];var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}var wasmImports={"d":_emscripten_date_now,"c":_emscripten_memcpy_big,"b":_emscripten_resize_heap,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=function(){return(___wasm_call_ctors=Module["asm"]["f"]).apply(null,arguments)};var _fib=Module["_fib"]=function(){return(_fib=Module["_fib"]=Module["asm"]["g"]).apply(null,arguments)};var _greet=Module["_greet"]=function(){return(_greet=Module["_greet"]=Module["asm"]["h"]).apply(null,arguments)};var _printInt8Array=Module["_printInt8Array"]=function(){return(_printInt8Array=Module["_printInt8Array"]=Module["asm"]["i"]).apply(null,arguments)};var _printInt16Array=Module["_printInt16Array"]=function(){return(_printInt16Array=Module["_printInt16Array"]=Module["asm"]["j"]).apply(null,arguments)};var _printInt32Array=Module["_printInt32Array"]=function(){return(_printInt32Array=Module["_printInt32Array"]=Module["asm"]["k"]).apply(null,arguments)};var _printFloat32Array=Module["_printFloat32Array"]=function(){return(_printFloat32Array=Module["_printFloat32Array"]=Module["asm"]["l"]).apply(null,arguments)};var _printFloat64Array=Module["_printFloat64Array"]=function(){return(_printFloat64Array=Module["_printFloat64Array"]=Module["asm"]["m"]).apply(null,arguments)};var _printUInt8Array=Module["_printUInt8Array"]=function(){return(_printUInt8Array=Module["_printUInt8Array"]=Module["asm"]["n"]).apply(null,arguments)};var _printUInt16Array=Module["_printUInt16Array"]=function(){return(_printUInt16Array=Module["_printUInt16Array"]=Module["asm"]["o"]).apply(null,arguments)};var _printUInt32Array=Module["_printUInt32Array"]=function(){return(_printUInt32Array=Module["_printUInt32Array"]=Module["asm"]["p"]).apply(null,arguments)};var _mockRandom=Module["_mockRandom"]=function(){return(_mockRandom=Module["_mockRandom"]=Module["asm"]["q"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return(_malloc=Module["_malloc"]=Module["asm"]["r"]).apply(null,arguments)};var ___errno_location=function(){return(___errno_location=Module["asm"]["__errno_location"]).apply(null,arguments)};var _free=Module["_free"]=function(){return(_free=Module["_free"]=Module["asm"]["t"]).apply(null,arguments)};Module["UTF8ToString"]=UTF8ToString;Module["stringToUTF8"]=stringToUTF8;var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}run();
