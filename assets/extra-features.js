
// ============ ERRORS BOOK ============
let errorTypeFilter='all';
function renderErrors(){
    const all=LS.get('errors',[]);
    document.getElementById('errReadingCount').textContent=all.filter(e=>e.type==='reading').length;
    document.getElementById('errListeningCount').textContent=all.filter(e=>e.type==='listening').length;
    const filtered=errorTypeFilter==='all'?all:all.filter(e=>e.type===errorTypeFilter);
    const container=document.getElementById('errorsList');
    if(!filtered.length){container.innerHTML='<div style="text-align:center;padding:40px;color:var(--t2)">暂无错题记录。做练习时出错的题目会自动记录在这里。</div>';return;}
    container.innerHTML=filtered.map((e,i)=>'<div class="card" style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:8px"><div><span class="tag" style="background:'+(e.type==='reading'?'#DBEAFE;color:#1E40AF':'#D1FAE5;color:#065F46')+'">'+(e.type==='reading'?'阅读':'听力')+'</span> <strong>'+e.question+'</strong></div><span style="font-size:0.72rem;color:var(--t2)">'+e.date+'</span></div><div style="margin-top:6px;font-size:0.82rem"><span style="color:var(--d)">✗ 你的答案: '+e.userAnswer+'</span> | <span style="color:var(--s)">✓ 正确答案: '+e.correctAnswer+'</span></div>'+(e.note?'<div style="margin-top:4px;font-size:0.78rem;color:var(--t2)">💡 '+e.note+'</div>':'')+'<button class="btn btn-xs btn-o" style="margin-top:8px" onclick="removeError('+i+')">删除</button></div>').join('');
}
function switchErrorType(type,btn){
    document.querySelectorAll('#page-errors .tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');errorTypeFilter=type;renderErrors();
}
function addError(type,question,userAnswer,correctAnswer,note,options){
    const errors=LS.get('errors',[]);
    errors.unshift({type,question,userAnswer,correctAnswer,note:note||'',options:options||null,date:new Date().toLocaleDateString('zh-CN')});
    if(errors.length>500)errors.length=500;
    LS.set('errors',errors);
}
function removeError(idx){
    const errors=LS.get('errors',[]);
    const all=errorTypeFilter==='all'?errors:errors.filter(e=>e.type===errorTypeFilter);
    const realIdx=errors.indexOf(all[idx]);
    if(realIdx>-1){errors.splice(realIdx,1);LS.set('errors',errors);}
    renderErrors();showToast('已删除');
}
function clearAllErrors(){
    if(!confirm('确定要清空所有错题记录吗？此操作不可恢复。'))return;
    LS.set('errors',[]);renderErrors();showToast('错题本已清空');
}

// ============ ERROR RETRY / 错题重练 ============
let errorRetryState={items:[],index:0,total:0,correct:0};

function startErrorRetry(){
    const all=LS.get('errors',[]);
    const filtered=errorTypeFilter==='all'?all:all.filter(e=>e.type===errorTypeFilter);
    if(!filtered.length){showToast('没有错题可以重练');return;}
    errorRetryState={items:[...filtered],index:0,total:filtered.length,correct:0};
    document.getElementById('errorsList').style.display='none';
    document.getElementById('errorRetryArea').style.display='block';
    showErrorRetryQuestion();
}

function showErrorRetryQuestion(){
    const st=errorRetryState;
    const area=document.getElementById('errorRetryArea');
    if(st.index>=st.items.length){
        const pct=Math.round(st.correct/st.total*100);
        area.innerHTML=`<div class="card" style="text-align:center"><h3>🎉 重练完成！</h3><div style="font-size:2.5rem;font-weight:900;color:${pct>=80?'var(--s)':'var(--warn)'};margin:12px 0">${st.correct}/${st.total}</div><p style="color:var(--t2)">正确率 ${pct}%</p><div style="display:flex;gap:8px;justify-content:center;margin-top:12px"><button class="btn btn-p btn-sm" onclick="startErrorRetry()">🔄 再练一次</button><button class="btn btn-o btn-sm" onclick="exitErrorRetry()">↩ 返回错题本</button></div></div>`;
        return;
    }
    const e=st.items[st.index];
    let html=`<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><h3 style="margin:0">🔄 错题重练 <span style="font-size:0.8rem;color:var(--t2);font-weight:400">${st.index+1}/${st.total}</span></h3><span class="tag" style="background:${e.type==='reading'?'#DBEAFE;color:#1E40AF':'#D1FAE5;color:#065F46'}">${e.type==='reading'?'阅读':'听力'}</span></div>`;
    html+=`<div class="quiz-q"><div class="q-text">${e.question}</div>`;
    if(e.type==='reading'&&e.options){
        html+=`<div style="margin-top:8px">`+e.options.split('|').map((o,oi)=>`<span class="quiz-opt" onclick="answerErrorRetry(this,'${oi}')">${String.fromCharCode(65+oi)}. ${o}</span>`).join('')+`</div>`;
    }else{
        html+=`<div style="display:flex;gap:8px;margin-top:8px"><input type="text" id="errRetryInput" placeholder="输入答案..." style="max-width:300px" onkeydown="if(event.key==='Enter')answerErrorRetryText()"><button class="btn btn-p btn-sm" onclick="answerErrorRetryText()">检查</button></div>`;
    }
    html+=`<div class="quiz-fb" id="errRetryFb"></div>`;
    html+=`<div style="margin-top:10px"><button class="btn btn-sm btn-o" onclick="exitErrorRetry()">↩ 结束重练</button></div></div>`;
    area.innerHTML=html;
}

function answerErrorRetry(el,val){
    const e=errorRetryState.items[errorRetryState.index];
    const correct=e.correctAnswer;
    const fb=document.getElementById('errRetryFb');
    const parent=el.parentElement;
    parent.querySelectorAll('.quiz-opt').forEach(o=>{o.classList.remove('chosen','correct','wrong');o.style.pointerEvents='none'});
    el.classList.add('chosen');
    if(val===correct){el.classList.add('correct');fb.className='quiz-fb ok show';fb.textContent='✅ 正确！';errorRetryState.correct++;}
    else{el.classList.add('wrong');fb.className='quiz-fb err show';fb.textContent='❌ 正确答案: '+e.correctAnswer+(e.note?' — '+e.note:'');}
    setTimeout(()=>{errorRetryState.index++;showErrorRetryQuestion();},1200);
}

function answerErrorRetryText(){
    const input=document.getElementById('errRetryInput');
    if(!input)return;
    const val=input.value.trim().toLowerCase();
    const e=errorRetryState.items[errorRetryState.index];
    const correct=e.correctAnswer.toLowerCase();
    const fb=document.getElementById('errRetryFb');
    if(val===correct){fb.className='quiz-fb ok show';fb.textContent='✅ 正确！';errorRetryState.correct++;}
    else{fb.className='quiz-fb err show';fb.textContent='❌ 正确答案: '+e.correctAnswer+(e.note?' — '+e.note:'');}
    setTimeout(()=>{errorRetryState.index++;showErrorRetryQuestion();},1500);
}

function exitErrorRetry(){
    document.getElementById('errorRetryArea').style.display='none';
    document.getElementById('errorsList').style.display='block';
    renderErrors();
}

// ============ DATA MANAGEMENT ============
function openDataModal(){document.getElementById('dataModal').classList.add('show');}
function closeDataModal(){document.getElementById('dataModal').classList.remove('show');}
function backupData(){
    try{const all={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith('ielts_'))all[k]=localStorage.getItem(k);}
    localStorage.setItem('ielts_backup',JSON.stringify(all));
    document.getElementById('dataMsg').innerHTML='<span style="color:var(--s)">✅ 备份成功！('+new Date().toLocaleString('zh-CN')+')</span>';}
    catch(e){document.getElementById('dataMsg').innerHTML='<span style="color:var(--d)">❌ 备份失败</span>';}
}
function restoreBackup(){
    try{const raw=localStorage.getItem('ielts_backup');if(!raw){document.getElementById('dataMsg').innerHTML='<span style="color:var(--warn)">⚠️ 没有找到备份</span>';return;}
    const all=JSON.parse(raw);Object.entries(all).forEach(([k,v])=>localStorage.setItem(k,v));
    document.getElementById('dataMsg').innerHTML='<span style="color:var(--s)">✅ 恢复成功！刷新页面生效</span>';updateStats();}
    catch(e){document.getElementById('dataMsg').innerHTML='<span style="color:var(--d)">❌ 恢复失败</span>';}
}
function exportData(){
    try{const all={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith('ielts_'))all[k]=localStorage.getItem(k);}
    const blob=new Blob([JSON.stringify(all,null,2)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='ielts-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();
    document.getElementById('dataMsg').innerHTML='<span style="color:var(--s)">✅ 导出成功！</span>';}
    catch(e){document.getElementById('dataMsg').innerHTML='<span style="color:var(--d)">❌ 导出失败</span>';}
}
function importData(input){
    try{const file=input.files[0];if(!file)return;
    const reader=new FileReader();reader.onload=function(e){
        try{const all=JSON.parse(e.target.result);Object.entries(all).forEach(([k,v])=>localStorage.setItem(k,v));
        document.getElementById('dataMsg').innerHTML='<span style="color:var(--s)">✅ 导入成功！刷新页面生效</span>';updateStats();}
        catch(ex){document.getElementById('dataMsg').innerHTML='<span style="color:var(--d)">❌ 文件格式错误</span>';}
    };reader.readAsText(file);}
    catch(e){document.getElementById('dataMsg').innerHTML='<span style="color:var(--d)">❌ 导入失败</span>';}
    input.value='';
}

// ============ ACHIEVEMENTS ============
const ACHIEVEMENTS=[
    {id:'first_vocab',icon:'📚',name:'词汇起步',desc:'掌握第一个词汇',check:()=>learnedSet.size>=1},
    {id:'vocab_100',icon:'📖',name:'百词斩',desc:'掌握100个词汇',check:()=>learnedSet.size>=100},
    {id:'vocab_500',icon:'🏆',name:'词汇达人',desc:'掌握500个词汇',check:()=>learnedSet.size>=500},
    {id:'vocab_1000',icon:'👑',name:'词汇大师',desc:'掌握1000个词汇',check:()=>learnedSet.size>=1000},
    {id:'first_reading',icon:'📰',name:'初读体验',desc:'完成第一篇阅读',check:()=>LS.get('reading_done',0)>=1},
    {id:'reading_5',icon:'📋',name:'阅读能手',desc:'完成5篇阅读',check:()=>LS.get('reading_done',0)>=5},
    {id:'reading_10',icon:'📜',name:'阅读达人',desc:'完成10篇阅读',check:()=>LS.get('reading_done',0)>=10},
    {id:'first_speaking',icon:'💬',name:'开口说',desc:'完成第一次口语练习',check:()=>LS.get('speaking_done',0)>=1},
    {id:'speaking_10',icon:'🎙️',name:'口语新星',desc:'完成10次口语练习',check:()=>LS.get('speaking_done',0)>=10},
    {id:'speaking_20',icon:'🗣️',name:'口语达人',desc:'完成20次口语练习',check:()=>LS.get('speaking_done',0)>=20},
    {id:'first_listening',icon:'🎧',name:'听力初探',desc:'完成第一次听力练习',check:()=>LS.get('listening_done',0)>=1},
    {id:'listening_5',icon:'🔊',name:'听力能手',desc:'完成5次听力练习',check:()=>LS.get('listening_done',0)>=5},
    {id:'first_writing',icon:'✍️',name:'初次写作',desc:'完成第一次写作练习',check:()=>LS.get('writing_done',0)>=1},
    {id:'streak_7',icon:'🔥',name:'连续7天',desc:'连续打卡7天',check:()=>{let s=0,td=new Date();for(let i=0;i<365;i++){const d=new Date(td);d.setDate(d.getDate()-i);if(weekDone[d.toISOString().split('T')[0]])s++;else break}return s>=7;}},
    {id:'streak_30',icon:'💎',name:'坚韧不拔',desc:'连续打卡30天',check:()=>{let s=0,td=new Date();for(let i=0;i<365;i++){const d=new Date(td);d.setDate(d.getDate()-i);if(weekDone[d.toISOString().split('T')[0]])s++;else break}return s>=30;}},
    {id:'mock_done',icon:'⏱️',name:'模拟首战',desc:'完成一次模拟考试',check:()=>LS.get('mock_done',0)>=1},
    {id:'all_skills',icon:'🌟',name:'全面发展',desc:'听说读写都练习过',check:()=>LS.get('reading_done',0)>=1&&LS.get('speaking_done',0)>=1&&LS.get('listening_done',0)>=1&&LS.get('writing_done',0)>=1},
    {id:'grammar_3',icon:'📐',name:'语法学者',desc:'完成3个语法点练习',check:()=>LS.get('grammar_done',0)>=3},
    {id:'grammar_6',icon:'🎓',name:'语法通关',desc:'完成全部6个语法点',check:()=>LS.get('grammar_done',0)>=6},
    {id:'focus_10',icon:'🎯',name:'专注新人',desc:'累计专注10分钟',check:()=>LS.get('focus_time',0)>=10},
    {id:'focus_60',icon:'🧘',name:'深度专注',desc:'累计专注1小时',check:()=>LS.get('focus_time',0)>=60},
];
function getUnlockedAchievements(){
    const unlocked=LS.get('achievements',[]);
    return ACHIEVEMENTS.map(a=>({...a,unlocked:unlocked.includes(a.id)||a.check()})).map(a=>{if(a.unlocked&&!unlocked.includes(a.id)){unlocked.push(a.id);LS.set('achievements',unlocked);}return a;});
}
function renderAchievements(){
    const list=getUnlockedAchievements();
    const wall=document.getElementById('badgeWall');
    const unlockedCount=document.getElementById('badgeUnlockedCount');
    const totalCount=document.getElementById('badgeTotalCount');
    const progress=document.getElementById('badgeOverallProgress');
    if(!wall)return;
    const unlocked=list.filter(a=>a.unlocked).length;
    const total=list.length;
    if(unlockedCount)unlockedCount.textContent=unlocked;
    if(totalCount)totalCount.textContent=total;
    if(progress)progress.style.width=Math.round(unlocked/total*100)+'%';
    // Category grouping
    const categories={vocab:{icon:'📚',label:'词汇'},reading:{icon:'📖',label:'阅读'},speaking:{icon:'💬',label:'口语'},general:{icon:'🌟',label:'综合'}};
    wall.innerHTML=list.map(a=>{
        const cat=a.id.includes('vocab')?'vocab':a.id.includes('reading')?'reading':a.id.includes('speaking')?'speaking':'general';
        return `<div style="text-align:center;padding:14px 10px;border-radius:12px;background:${a.unlocked?'linear-gradient(135deg,#FFFBEB,#FEF3C7)':'#F1F5F9'};border:2px solid ${a.unlocked?'var(--al)':'var(--b)'};transition:.3s;${a.unlocked?'box-shadow:0 2px 12px rgba(245,158,11,0.2)':''}">
            <div style="font-size:2.2rem;filter:${a.unlocked?'none':'grayscale(1) opacity(0.3)'}">${a.icon}</div>
            <div style="font-weight:700;font-size:0.78rem;margin-top:4px;color:${a.unlocked?'var(--t)':'var(--t2)'}">${a.name}</div>
            <div style="font-size:0.65rem;color:var(--t2)">${a.desc}</div>
            <div style="margin-top:4px;font-size:0.7rem;font-weight:700;color:${a.unlocked?'var(--a)':'var(--t2)'}">${a.unlocked?'⭐ 已获得':'🔒'}</div>
        </div>`;
    }).join('');
}

function openAchievements(){document.getElementById('achievementsModal').classList.add('show');renderAchievements();}
function closeAchievements(){document.getElementById('achievementsModal').classList.remove('show');}

function renderDashAchievements(){
    const container=document.getElementById('dashAchievements');
    if(!container)return;
    const list=getUnlockedAchievements();
    const unlocked=list.filter(a=>a.unlocked);
    const show=unlocked.slice(-5).reverse();
    if(!show.length){container.innerHTML='<span style="font-size:0.78rem;color:var(--t2)">开始学习解锁徽章吧！</span>';return;}
    container.innerHTML=show.map(a=>
        '<div style="text-align:center;padding:8px 12px;border-radius:10px;background:linear-gradient(135deg,#FFFBEB,#FEF3C7);border:2px solid var(--al);min-width:70px" title="'+a.name+' — '+a.desc+'">'+
        '<div style="font-size:1.5rem">'+a.icon+'</div>'+
        '<div style="font-size:0.6rem;color:var(--a);margin-top:2px;font-weight:700">'+a.name+'</div></div>'
    ).join('');
}

// ============ THEME TOGGLE ============
function toggleTheme(){
    const html=document.documentElement;
    const btn=document.getElementById('themeToggle');
    const isDark=html.getAttribute('data-theme')==='dark';
    if(isDark){
        html.removeAttribute('data-theme');
        btn.innerHTML='🌙 深色模式';
        LS.set('theme','light');
    }else{
        html.setAttribute('data-theme','dark');
        btn.innerHTML='☀️ 浅色模式';
        LS.set('theme','dark');
    }
}
function initTheme(){
    const saved=LS.get('theme','light');
    if(saved==='dark'){
        document.documentElement.setAttribute('data-theme','dark');
        const btn=document.getElementById('themeToggle');
        if(btn)btn.innerHTML='☀️ 浅色模式';
    }
}

// ============ FOCUS MODE ============
let focusInterval=null,focusSeconds=0;
function startFocusMode(){
    document.getElementById('focusOverlay').classList.add('show');
    focusSeconds=0;
    document.getElementById('focusTimer').textContent='00:00';
    if(focusInterval)clearInterval(focusInterval);
    focusInterval=setInterval(()=>{
        focusSeconds++;
        const m=Math.floor(focusSeconds/60).toString().padStart(2,'0');
        const s=(focusSeconds%60).toString().padStart(2,'0');
        document.getElementById('focusTimer').textContent=m+':'+s;
    },1000);
}
function stopFocusMode(){
    document.getElementById('focusOverlay').classList.remove('show');
    if(focusInterval){clearInterval(focusInterval);focusInterval=null;}
    if(focusSeconds>0){
        const total=LS.get('focus_time',0)+Math.round(focusSeconds/60);
        LS.set('focus_time',total);
        showToast('专注 '+Math.round(focusSeconds/60)+' 分钟');
        focusSeconds=0;
    }
}

// ============ SM-2 SPACED REPETITION ============
// SM-2 algorithm: quality 0-5, interval in days
function sm2Schedule(quality, prevInterval, prevEF, prevReps){
    let ef=prevEF||2.5;
    ef=ef+(0.1-(5-quality)*(0.08+(5-quality)*0.02));
    if(ef<1.3)ef=1.3;
    let interval,reps;
    if(quality<3){
        interval=1;reps=0;
    }else{
        reps=(prevReps||0)+1;
        if(reps===1)interval=1;
        else if(reps===2)interval=6;
        else interval=Math.round(prevInterval*ef);
    }
    return {interval,ef,reps,nextReview:Date.now()+interval*86400000};
}

function getVocabSM2(word){
    const data=LS.get('sm2_data',{});
    return data[word]||null;
}

function saveVocabSM2(word, entry){
    const data=LS.get('sm2_data',{});
    data[word]=entry;
    LS.set('sm2_data',data);
}

function recordVocabReview(word, quality){
    const prev=getVocabSM2(word)||{};
    const result=sm2Schedule(quality,prev.interval||1,prev.ef||2.5,prev.reps||0);
    result.word=word;result.lastQuality=quality;
    saveVocabSM2(word,result);
}

function getDueVocab(){
    const data=LS.get('sm2_data',{});
    const now=Date.now();
    return Object.entries(data).filter(([w,e])=>!e.nextReview||e.nextReview<=now).map(([w])=>w);
}

function getSM2Stats(){
    const data=LS.get('sm2_data',{});
    const now=Date.now();
    let due=0,total=Object.keys(data).length;
    Object.values(data).forEach(e=>{if(!e.nextReview||e.nextReview<=now)due++;});
    return {total,due};
}

function renderSM2Badge(){
    const container=document.getElementById('sm2Badge');
    if(!container)return;
    const stats=getSM2Stats();
    if(stats.total===0){container.style.display='none';return;}
    container.style.display='inline-flex';
    container.className='sm2-badge'+(stats.due>0?' due':'');
    container.textContent='🔄 '+(stats.due>0?stats.due+'词待复习':stats.total+'词已学');
    container.title='SM-2间隔记忆：共'+stats.total+'词，'+stats.due+'词待复习';
}

// ============ ENHANCED PRACTICE STATS ============
function getSkillStats(skill){
    const total=LS.get(skill+'_done',0);
    const correct=LS.get(skill+'_correct',0);
    const time=LS.get(skill+'_time',0);
    const rate=total>0?Math.round(correct/Math.max(1,total/10)*10):0;
    return {total,correct,time,rate};
}

function recordSkillPractice(skill, correctCount, timeMinutes){
    const prev=LS.get(skill+'_done',0);
    LS.set(skill+'_done',prev+1);
    const prevC=LS.get(skill+'_correct',0);
    LS.set(skill+'_correct',prevC+(correctCount||0));
    const prevT=LS.get(skill+'_time',0);
    LS.set(skill+'_time',prevT+(timeMinutes||0));
    updateStats();
}

function renderSkillStatsBars(){
    const container=document.getElementById('skillStatsBars');
    if(!container)return;
    const skills=[
        {id:'vocab',label:'词汇',icon:'📚',fill:'fill-vocab',count:learnedSet.size,max:Math.max(1,V.length)},
        {id:'reading',label:'阅读',icon:'📖',fill:'fill-reading',count:LS.get('reading_done',0),max:20},
        {id:'listening',label:'听力',icon:'🎧',fill:'fill-listening',count:LS.get('listening_done',0),max:10},
        {id:'speaking',label:'口语',icon:'💬',fill:'fill-speaking',count:LS.get('speaking_done',0),max:30},
        {id:'writing',label:'写作',icon:'✍️',fill:'fill-writing',count:LS.get('writing_done',0),max:20},
    ];
    container.innerHTML=skills.map(s=>{
        const pct=Math.min(100,Math.round(s.count/Math.max(1,s.max)*100));
        const st=getSkillStats(s.id);
        let detail='';
        if(s.id==='vocab')detail='已掌握 '+s.count+' 词';
        else if(s.id==='reading'||s.id==='listening')detail='完成 '+s.count+' 次 | 正确率 '+st.rate+'% | '+st.time+'分钟';
        else detail='完成 '+s.count+' 次 | '+st.time+'分钟';
        return '<div class="skill-stat-row"><span style="width:36px">'+s.icon+'</span><span class="skill-label">'+s.label+'</span><div class="skill-stat-minibar"><div class="fill '+s.fill+'" style="width:'+pct+'%"></div></div><span style="font-size:0.65rem;color:var(--t2);min-width:40px;text-align:right">'+pct+'%</span><span style="font-size:0.62rem;color:var(--t2);margin-left:4px">'+detail+'</span></div>';
    }).join('');
}

// ============ WEAK AREAS ANALYSIS ============
function getWeakTopics(){
    const errors=LS.get('errors',[]);
    const freq={};
    errors.forEach(e=>{
        const key=e.question||'';
        const topic=e.topic||'general';
        if(!freq[topic])freq[topic]=0;
        freq[topic]++;
    });
    const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5);
    return sorted;
}

function renderWeakAreas(){
    const container=document.getElementById('weakAreas');
    if(!container)return;
    const weak=getWeakTopics();
    if(!weak.length){container.innerHTML='<span style="color:var(--t2);font-size:0.8rem">暂无数据，开始练习后会自动分析薄弱环节</span>';return;}
    container.innerHTML='<div style="font-size:0.75rem;font-weight:700;color:var(--d);margin-bottom:4px">⚠️ 需要加强的方面</div>'+weak.map(([t,c])=>'<span class="tag" style="background:#FEE2E2;color:#991B1B;margin:2px">'+t+' ×'+c+'</span>').join(' ');
}

// ============ LEARNING PATH MAP ============
function renderLearningPath(){
    const container=document.getElementById('learningPathContainer');
    if(!container)return;
    const stages=[
        {id:'placement',icon:'📝',label:'水平摸底',desc:'完成学前水平测试',page:null,action:()=>openPlacementTest(),done:()=>!!LS.get('placement_done',null)},
        {id:'vocab',icon:'📚',label:'基础词汇',desc:'掌握至少100个词汇',page:'vocabulary',done:()=>learnedSet.size>=100,progress:()=>Math.min(100,Math.round(learnedSet.size/100*100))},
        {id:'grammar',icon:'📐',label:'语法通关',desc:'完成全部6个语法点',page:'grammar',done:()=>LS.get('grammar_done',0)>=6,progress:()=>Math.min(100,Math.round(LS.get('grammar_done',0)/6*100))},
        {id:'reading',icon:'📖',label:'阅读入门',desc:'完成3篇阅读练习',page:'reading',done:()=>LS.get('reading_done',0)>=3,progress:()=>Math.min(100,Math.round(LS.get('reading_done',0)/3*100))},
        {id:'listening',icon:'🎧',label:'听力训练',desc:'完成3次听力练习',page:'listening',done:()=>LS.get('listening_done',0)>=3,progress:()=>Math.min(100,Math.round(LS.get('listening_done',0)/3*100))},
        {id:'speaking',icon:'💬',label:'口语实战',desc:'完成10次口语练习',page:'speaking',done:()=>LS.get('speaking_done',0)>=10,progress:()=>Math.min(100,Math.round(LS.get('speaking_done',0)/10*100))},
        {id:'writing',icon:'✍️',label:'写作进阶',desc:'完成写作练习',page:'writing',done:()=>LS.get('writing_done',0)>=1,progress:()=>LS.get('writing_done',0)>=1?100:0},
        {id:'mock',icon:'⏱️',label:'模拟冲刺',desc:'完成一次模拟考试',page:'mockexam',done:()=>LS.get('mock_done',0)>=1},
    ];
    container.innerHTML=stages.map((s,i)=>{
        const done=s.done? s.done():false;
        const pct=s.progress?s.progress():done?100:0;
        const statusIcon=done?'✅':(pct>0?'🔄':'⬜');
        const bg=done?'#F0FDF4':(pct>0?'#FFFBEB':'#F8FAFC');
        const border=done?'#BBF7D0':(pct>0?'#FCD34D':'var(--b)');
        return `<div style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;background:${bg};border:2px solid ${border};cursor:${s.page||s.action?'pointer':'default'};transition:.2s" onclick="${s.action?'(\"'+s.id+'\")':s.page?'showPage(\"'+s.page+'\")':''}" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform=''">
            <div style="font-size:1.6rem;min-width:36px;text-align:center">${s.icon}</div>
            <div style="flex:1;min-width:0">
                <div style="font-weight:700;font-size:0.85rem;color:${done?'var(--s)':'var(--t)'}">${statusIcon} ${s.label}</div>
                <div style="font-size:0.7rem;color:var(--t2)">${s.desc}</div>
                ${pct>0&&!done?`<div class="progress-bar" style="margin-top:4px;height:4px"><div class="progress-fill" style="width:${pct}%;background:var(--a)"></div></div>`:''}
            </div>
            <span style="font-size:0.7rem;color:${done?'var(--s)':pct>0?'var(--a)':'var(--t2)'};font-weight:700">${done?'完成':pct>0?pct+'%':'未开始'}</span>
        </div>`;
    }).join('');
    // Placement test special handler
    container.querySelectorAll('[onclick*="placement"]').forEach(el=>{
        el.onclick=function(){openPlacementTest();};
    });
}

// Init on load
initTheme();
