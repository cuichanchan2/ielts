// ============ EXTERNAL QUESTION BANK LOADER ============
// Architecture: Drop .js files into assets/ folder, they auto-register
// Or paste JSON via the settings panel, it gets parsed and stored

// Registry of loaded question banks
var QB = window.QB || {listening:[], reading:[], writing:[], speaking:[]};

// Auto-detect and load question banks from assets/ folder
// To add new content: create a file like assets/my-questions.js with:
//   registerQuestionBank({type:'reading',title:'My Passage',...})
function registerQuestionBank(item){
    if(!item||!item.type)return;
    var type=item.type;
    if(!QB[type])QB[type]=[];
    QB[type].push(item);
    console.log('[QB] Registered '+type+' item: '+(item.title||item.q||'untitled'));
}

// Load from JSON string (paste in settings)
function loadFromJSON(jsonStr){
    try{
        var data=JSON.parse(jsonStr);
        if(Array.isArray(data)){
            data.forEach(function(item){registerQuestionBank(item);});
        }else{
            registerQuestionBank(data);
        }
        LS.set('custom_qb',jsonStr);
        showToast('✅ 题库加载成功！共 '+data.length+' 条');
        return true;
    }catch(e){
        showToast('❌ JSON格式错误，请检查');
        return false;
    }
}

// Load from remote URL
function loadFromURL(url){
    showToast('⏳ 正在从远程加载题库...');
    fetch(url).then(function(r){return r.json();}).then(function(data){
        if(Array.isArray(data)){
            data.forEach(function(item){registerQuestionBank(item);});
            showToast('✅ 远程题库加载成功！共 '+data.length+' 条');
        }
    }).catch(function(){
        showToast('❌ 加载失败，请检查URL是否正确且支持CORS');
    });
}

// Load from local file (user selects a .json file)
function loadFromFile(input){
    var file=input.files[0];
    if(!file)return;
    var reader=new FileReader();
    reader.onload=function(e){
        var ok=loadFromJSON(e.target.result);
        if(ok)input.value='';
    };
    reader.readAsText(file);
}

// Get all loaded questions for a type
function getQBItems(type){
    return QB[type]||[];
}

// Restore previously loaded custom QB from localStorage
function restoreCustomQB(){
    var saved=LS.get('custom_qb','');
    if(saved){
        try{
            var data=JSON.parse(saved);
            if(Array.isArray(data)){
                data.forEach(function(item){registerQuestionBank(item);});
            }
            console.log('[QB] Restored '+data.length+' custom items from localStorage');
        }catch(e){}
    }
}

// Auto-restore on load
restoreCustomQB();

// ============ QUESTION BANK JSON FORMAT ============
// Add new items by creating JSON files with this format:
//
// Reading item:
// {
//   "type": "reading",
//   "title": "Climate Change and Agriculture",
//   "passage": "Full passage text here...",
//   "questions": [
//     {"q": "Question 1?", "type": "tfng", "ans": "true"},
//     {"q": "Question 2?", "type": "multiple", "options": ["A","B","C","D"], "ans": "B"}
//   ]
// }
//
// Listening item:
// {
//   "type": "listening",
//   "title": "Hotel Booking",
//   "script": "Full transcript...",
//   "questions": [
//     {"q": "The guest wants a ____ room.", "ans": "single"}
//   ]
// }
//
// Speaking item:
// {
//   "type": "speaking",
//   "part": "part1",
//   "q": "Do you like cooking?",
//   "a": "Sample answer..."
// }
//
// Writing item:
// {
//   "type": "writing",
//   "task": "task2",
//   "q": "Essay question...",
//   "tips": "Writing tips..."
// }

// Format example for the UI
var QB_FORMAT_EXAMPLE = JSON.stringify([
  {"type":"listening","title":"示例: 图书馆咨询","script":"Librarian: Hello, how can I help you? Student: I am looking for books on environmental science.","questions":[{"q":"The student is looking for books on ____ science.","ans":"environmental"}]},
  {"type":"reading","title":"示例: 气候变化短文","passage":"Climate change is one of the most pressing issues of our time. Rising global temperatures are causing polar ice caps to melt and sea levels to rise.","questions":[{"q":"Climate change is causing ____ to rise.","ans":"sea levels"},{"q":"Polar ____ are melting.","ans":"ice caps"}]},
  {"type":"speaking","part":"part1","q":"示例: Do you like reading?","a":"Yes, I enjoy reading both fiction and non-fiction. It helps me relax and learn new things."},
  {"type":"writing","task":"task2","q":"示例: Some people think that technology makes life more complicated. Do you agree?","tips":"Arguments: convenience vs. information overload. Conclusion: technology is a tool, its impact depends on how we use it."}
], null, 2);
