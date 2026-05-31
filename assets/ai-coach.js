// ============ AI COACH - OFFLINE ENGINE ============
// No API key needed. Uses local rule engine + word database + browser TTS.

var aiCoachMode='speaking';
var aiCoachHistory=[];
var aiSpeakingTopicIdx=0;
var aiTimerId=null;
var aiTimerSeconds=0;

// ===== SPEAKING CUE CARDS =====
var AI_SPEAKING_CARDS=[
    {topic:'Describe a skill you would like to learn.',prompts:['What the skill is','Why you want to learn it','How you would learn it','And explain how it would benefit you'],sample:'A skill I would really like to learn is coding, specifically Python programming. I have been interested in technology for a long time but never had the chance to learn properly. I want to learn coding because almost every industry now relies on technology, and having programming skills would make me much more versatile. I plan to learn through online courses and hands-on projects. There are many excellent free resources on platforms like Coursera. I would start with basics and then work on small personal projects. Learning to code would open up new career opportunities and help me better understand the digital world.'},
    {topic:'Describe a place near water that you have visited.',prompts:['Where the place is','When you went there','What you did there','And explain how you felt'],sample:'I would like to talk about Qingdao, a beautiful coastal city in Shandong province. I went there with friends during summer break two years ago. We stayed for five days. The highlight was definitely the coastline — we spent hours walking along the seaside promenade, feeling the cool sea breeze. We also visited the famous Zhanqiao Pier. One particularly memorable experience was watching the sunrise at the beach at 4:30 in the morning. The sky transformed from dark blue to shades of orange and pink. Being near water gave me an incredible sense of calm. The trip reminded me how important it is to disconnect from routine and immerse yourself in nature.'},
    {topic:'Describe a person who has influenced you.',prompts:['Who this person is','How you know this person','What they are like','And explain why they influenced you'],sample:'The person who has influenced me most is my high school English teacher, Ms. Wang. She had a unique ability to make literature come alive — she did not just teach grammar and vocabulary, but helped us understand the emotions and ideas behind the words. She always encouraged us to express our own opinions and never made us feel embarrassed about mistakes. Her passion for teaching inspired me to become a more curious and open-minded person. Even now, when I face challenges, I often think about her advice: every mistake is a step toward improvement.'},
    {topic:'Describe an important decision you made.',prompts:['What the decision was','When you made it','Why you made this decision','And explain how you felt about it'],sample:'An important decision I made was choosing my university major. At the end of high school, I was torn between following my passion for literature and choosing a more practical major like business. After much thought and discussion with my parents, I decided to pursue a business degree with a minor in literature. I made this decision because I wanted to balance practicality with passion. At first I felt uncertain, but looking back now, I believe it was the right choice. The combination has served me well, giving me both professional skills and the ability to think critically.'},
    {topic:'Describe a piece of technology you find useful.',prompts:['What the technology is','When you first started using it','What you use it for','And explain why you find it useful'],sample:'A piece of technology I find incredibly useful is my smartphone. I got my first smartphone about eight years ago and it has become an indispensable part of my daily life. I use it for communication, navigation, mobile banking, reading news, and managing my schedule. What makes it so useful is that it combines so many functions into a single portable device. In the past I would have needed a separate camera, map, calendar, and computer. However, I am also aware of the downsides. I try to be mindful of screen time and make an effort to put it away when with friends or family.'},
    {topic:'Describe a memorable trip you took.',prompts:['Where you went','Who you went with','What you did there','And explain why it was memorable'],sample:'A truly memorable trip was my visit to Yunnan province last spring. I went with two close friends, and we spent a week exploring Kunming, Dali, and Lijiang. The scenery was absolutely breathtaking — from the stone forests to the ancient towns and snow-capped mountains. What made it memorable was not just the beautiful landscapes but also the rich minority cultures we encountered. We tried local foods, watched traditional performances, and learned about the Naxi and Bai cultures. The trip reminded me how diverse and fascinating China is. Those memories still make me smile whenever I think about them.'},
    {topic:'Describe a book that you enjoyed reading.',prompts:['What the book was','When you read it','What it was about','And explain why you enjoyed it'],sample:'A book I really enjoyed is "Sapiens: A Brief History of Humankind" by Yuval Noah Harari. I read it about two years ago during a summer break. The book traces the history of humankind from the Stone Age to the present, exploring how Homo sapiens came to dominate the world. What fascinated me was how Harari connects historical events to our everyday lives — explaining why we have money, religions, and nations. The writing is accessible and engaging, making complex ideas easy to understand. This book changed the way I think about human civilization and made me question many assumptions I had about society.'},
    {topic:'Describe a festival that is important in your culture.',prompts:['What the festival is','When it takes place','How people celebrate it','And explain why it is important'],sample:'The most important festival in my culture is the Spring Festival, or Chinese New Year. It usually falls in late January or early February. The celebration lasts for 15 days. Before the festival, families thoroughly clean their homes to sweep away bad luck. On New Year\'s Eve, the whole family gathers for a reunion dinner with dishes like dumplings and fish. Children receive red envelopes with money. There are fireworks and lion dances in the streets. The Spring Festival is important because it strengthens family bonds and preserves cultural traditions that have been passed down for thousands of years.'}
];

// ===== WRITING ANALYSIS ENGINE =====
function analyzeWriting(essay){
    var words=essay.split(/\s+/).filter(function(w){return w.length>0;});
    var sentences=essay.split(/[.!?]+/).filter(function(s){return s.trim().length>0;});
    var wordCount=words.length;
    var sentenceCount=sentences.length;
    var avgWordsPerSentence=sentenceCount>0?Math.round(wordCount/sentenceCount):0;
    var paragraphs=essay.split(/\n\n+/).filter(function(p){return p.trim().length>0;});
    var paraCount=paragraphs.length;

    // Linking words check
    var linkers=['firstly','secondly','thirdly','finally','moreover','furthermore','however','nevertheless','therefore','consequently','in addition','on the other hand','in contrast','for example','for instance','in conclusion','to summarize','overall'];
    var linkerCount=0;var found=[];
    linkers.forEach(function(l){
        var re=new RegExp('\\b'+l+'\\b','gi');var m=essay.match(re);
        if(m){linkerCount+=m.length;found.push(l+'('+m.length+')');}
    });

    // Band estimate
    var bandEst=0;
    if(wordCount>=250)bandEst+=2;else if(wordCount>=200)bandEst+=1.5;else if(wordCount>=150)bandEst+=1;else bandEst+=0;
    if(paraCount>=4)bandEst+=1.5;else if(paraCount>=3)bandEst+=1;else bandEst+=0;
    if(linkerCount>=6)bandEst+=1.5;else if(linkerCount>=4)bandEst+=1;else if(linkerCount>=2)bandEst+=0.5;
    if(avgWordsPerSentence>=15&&avgWordsPerSentence<=25)bandEst+=1;else if(avgWordsPerSentence>=10)bandEst+=0.5;
    bandEst+=3.5; // base
    bandEst=Math.min(8.5,Math.max(3.5,bandEst));
    bandEst=Math.round(bandEst*2)/2; // round to 0.5

    var feedback=[];
    if(wordCount<150)feedback.push('⚠️ 字数不足150词（Task1最低要求），请扩充内容');
    else if(wordCount<250)feedback.push('⚠️ 字数不足250词（Task2最低要求），需要更多展开');
    else feedback.push('✅ 字数达标');
    if(paraCount<3)feedback.push('⚠️ 段落数偏少（'+paraCount+'段），建议至少4段（开头+2主体+结尾）');
    else feedback.push('✅ 段落结构合理（'+paraCount+'段）');
    if(linkerCount<3)feedback.push('⚠️ 衔接词偏少（仅'+linkerCount+'个），建议多使用Firstly/However/Therefore等');
    else feedback.push('✅ 衔接词使用良好（'+linkerCount+'个）');
    if(avgWordsPerSentence<10)feedback.push('⚠️ 句子偏短（平均'+avgWordsPerSentence+'词），尝试写复合句');
    else if(avgWordsPerSentence>28)feedback.push('⚠️ 句子偏长（平均'+avgWordsPerSentence+'词），适当拆分长句');
    else feedback.push('✅ 句子长度适中（平均'+avgWordsPerSentence+'词）');

    // Check for common errors
    var commonErrors=[];
    if(essay.match(/\bi am agree\b/gi))commonErrors.push('❌ "I am agree" → 正确: "I agree"');
    if(essay.match(/\bmore better\b/gi))commonErrors.push('❌ "more better" → 正确: "better"');
    if(essay.match(/\bpeoples\b/gi))commonErrors.push('❌ "peoples" → 正确: "people" (已经是复数)');
    if(essay.match(/\bcan able to\b/gi))commonErrors.push('❌ "can able to" → 正确: "can" 或 "able to"（二选一）');
    if(essay.match(/\bDespite of\b/gi))commonErrors.push('❌ "Despite of" → 正确: "Despite" (不加of)');
    if(essay.match(/\baccording to me\b/gi))commonErrors.push('❌ "According to me" → 正确: "In my opinion"');
    if(essay.match(/\bin the other hand\b/gi)&&!essay.match(/\bon the other hand\b/gi))commonErrors.push('❌ "In the other hand" → 正确: "On the other hand"');
    if(essay.match(/\bdiscuss about\b/gi))commonErrors.push('❌ "discuss about" → 正确: "discuss" (不加about)');

    return {
        wordCount:wordCount,sentenceCount:sentenceCount,avgWordsPerSentence:avgWordsPerSentence,
        paraCount:paraCount,linkerCount:linkerCount,foundLinkers:found,
        bandEst:bandEst,feedback:feedback,commonErrors:commonErrors
    };
}

// ===== GRAMMAR QUIZ BANK =====
var AI_GRAMMAR_QUIZ=[
    {q:'She ___ to school every day.',opts:['go','goes','going','gone'],ans:1,explain:'一般现在时第三人称单数 + s/es。She → goes。'},
    {q:'I ___ my homework yesterday.',opts:['do','did','done','doing'],ans:1,explain:'一般过去时。yesterday用过去式did。'},
    {q:'They ___ live here since 2010.',opts:['has','have','had','having'],ans:1,explain:'现在完成时 have/has + 过去分词。They用have。'},
    {q:'The book ___ I read was amazing.',opts:['who','which','what','where'],ans:1,explain:'修饰物用which或that。修饰人用who。'},
    {q:'If I ___ rich, I would travel the world.',opts:['am','was','were','be'],ans:2,explain:'虚拟条件句(与现在事实相反)用were，不用was。'},
    {q:'She asked me ___ I was feeling.',opts:['what','how','why','which'],ans:1,explain:'"How I was feeling" = 我感受如何。固定搭配。'},
    {q:'There ___ many people at the party.',opts:['is','was','were','has'],ans:2,explain:'people是复数，用were。There is + 单数, There are/were + 复数。'},
    {q:'He is interested ___ learning English.',opts:['at','in','on','for'],ans:1,explain:'be interested in + 名词/动名词。固定搭配。'},
    {q:'Neither John nor his friends ___ there.',opts:['was','were','is','has'],ans:1,explain:'neither...nor 就近原则，离动词最近的是his friends(复数)→were。'},
    {q:'I look forward to ___ you.',opts:['see','seeing','seen','saw'],ans:1,explain:'look forward to + 动名词(doing)。to是介词，不是不定式。'},
    {q:'This is the city ___ I was born.',opts:['which','that','where','when'],ans:2,explain:'修饰地点用where = in which。'},
    {q:'She has ___ finished her homework.',opts:['yet','already','still','just now'],ans:1,explain:'already用于肯定句"已经"；yet用于否定/疑问句"还"。'},
    {q:'By 2030, the population ___ significantly.',opts:['increase','increased','will have increased','increasing'],ans:2,explain:'By + 将来时间 → 将来完成时 will have + 过去分词。'},
    {q:'The meeting ___ at 3pm tomorrow.',opts:['starts','started','starting','has started'],ans:0,explain:'按时刻表发生的将来事件用一般现在时。'},
    {q:'I wish I ___ harder for the exam.',opts:['study','studied','had studied','studying'],ans:2,explain:'wish + 过去完成时 → 对过去的遗憾(与过去事实相反)。'},
    {q:'Not only ___ late, but he also forgot the documents.',opts:['he was','was he','he is','did he'],ans:1,explain:'Not only 开头 → 倒装句 → 助动词提前。'},
    {q:'The number of students ___ increasing.',opts:['are','is','were','have'],ans:1,explain:'The number of ... 作主语视为单数 → is。A number of ... 才是复数。'},
    {q:'She spent three hours ___ the report.',opts:['write','to write','writing','written'],ans:2,explain:'spend time (in) doing something。固定搭配。'},
    {q:'It is essential that he ___ on time.',opts:['arrives','arrive','arrived','arriving'],ans:1,explain:'It is essential that + 虚拟语气(动词原形)。不加s。'},
    {q:'___ the weather was bad, we still went out.',opts:['Because','Although','Despite','Since'],ans:1,explain:'Although + 从句 = 尽管。Despite + 名词。注意区别。'}
];

// ===== FAQ KNOWLEDGE BASE =====
var AI_FAQ=[
    {k:['band','score','分数','几分','评分','打分'],a:'雅思总分9分，听说读写各9分，总分取四科平均分。0.25进0.5，0.75进1。例如6.5+6.0+5.5+6.0=24÷4=6.0（总分6.0）。\n\n各分数段含义：\n• 9分 = 专家级\n• 7分 = 良好（大多数海外大学要求）\n• 6分 = 合格\n• 5分 = 基础水平'},
    {k:['time','时长','多久','时间','分钟','小时'],a:'雅思考试总时长约2小时45分钟（不含口语）：\n\n• 听力：30分钟 + 10分钟誊写 = 40分钟\n• 阅读：60分钟（3篇文章）\n• 写作：60分钟（Task1 20分钟 + Task2 40分钟）\n• 口语：11-14分钟（单独安排，可能同天或前后几天）'},
    {k:['part','section','部分','几部分','几个'],a:'雅思各科结构：\n\n📖 阅读：3篇文章/40题/60分钟\n🎧 听力：4个Section/40题/30分钟\n✍️ 写作：Task1(150词)+Task2(250词)/60分钟\n🗣️ 口语：Part1(日常问答)+Part2(话题独白)+Part3(深度讨论)/11-14分钟'},
    {k:['vocab','词汇','单词','词汇量','多少词'],a:'雅思各分数段词汇量参考：\n\n• Band 5-5.5：约3000-4000词\n• Band 6-6.5：约4000-5000词\n• Band 7+：约6000-8000词\n\n本平台收录3900+高频词，按话题分类。日常学习建议每天背20-30个新词+复习旧词。重点不是认识多少词，而是能主动使用多少词。'},
    {k:['speaking','口语','说','表达','流利'],a:'雅思口语提分要点：\n\n1. 流利度 > 准确度（不要因怕错而停顿）\n2. 用连接词自然过渡（Well, Actually, I suppose...）\n3. Part2用1分钟准备时间写出关键词\n4. Part3用观点+解释+例子的结构\n5. 录音回听发现自己的问题\n\n本平台"口语题库+AI对话"页有54道Part1+28道Part2范文。'},
    {k:['writing','写作','作文','写','文章'],a:'雅思写作提分要点：\n\nTask1（图表作文）：\n• 150词/20分钟\n• 开头改写题目 + 概述趋势 + 2段细节\n• 重点：数据描述（上升/下降/波动/占比）\n\nTask2（议论文）：\n• 250词/40分钟\n• 开头+2-3主体段+结尾\n• 每段：观点+解释+例子\n\n本平台写作页有万能模板+范文+自评打分表。'},
    {k:['listening','听力','听','听懂'],a:'雅思听力提分要点：\n\n• 先读题！利用每段录音前的30秒预读\n• 注意同义替换（听到的词≈题干的词但不同）\n• Section 1/2偏生活场景，Section 3/4偏学术场景\n• 拼写要准确（英式/美式都可以但要一致）\n• 本平台模拟考试中有20套完整听力练习'},
    {k:['reading','阅读','读','文章','理解'],a:'雅思阅读提分要点：\n\n• 先读题再读文章！\n• 60分钟3篇文章，P1最容易，合理分配时间\n• 关键词定位法：扫读找题干关键词\n• 判断题：TRUE=文中明确说了，FALSE=文中明确相反，NOT GIVEN=文中没提\n• 本平台有15+篇阅读练习+20套模拟考试'},
    {k:['prepare','准备','备考','计划','学习','怎么学'],a:'零基础备考建议（3-6个月）：\n\n第1个月：打基础\n• 每天30词汇 + 1个语法点\n• 听力Section1精听 + 阅读P1练习\n\n第2-3个月：专项提升\n• 每天40词汇 + 听力精听15分钟\n• 阅读限时练习 + 口语自练录音\n• 每3天写一篇作文\n\n第4-6个月：冲刺模考\n• 每周2-3套完整模考\n• 错题分析 + 针对性补弱\n• 口语和写作找反馈（本平台AI陪练可以帮忙）'},
    {k:['exam','考试','当天','考场','注意'],a:'雅思考试当天注意事项：\n\n笔试当天：\n• 带身份证/护照 + 准考证\n• 提前30分钟到达\n• 不能带手机/手表/纸张\n• 听力→阅读→写作 连续完成\n\n口语考试：\n• 可能同一天或前后几天\n• 提前15分钟到达\n• 穿着整洁但不需正装\n• 保持微笑和自信'},
    {k:['ielts','雅思','是什么','介绍'],a:'IELTS（International English Language Testing System）雅思考试是全球最广泛认可的英语水平测试之一。\n\n两种类型：\n• Academic（学术类）：留学用\n• General Training（培训类）：移民/工作用\n\n考试内容：听说读写四科，每科9分制。\n\n认可度：英国/澳洲/加拿大/新西兰大学普遍要求，美国也有3000+院校认可。'}
];

function aiMatchFAQ(q){
    var ql=q.toLowerCase();var best=null;var bestScore=0;
    AI_FAQ.forEach(function(item){
        var score=0;
        item.k.forEach(function(kw){if(ql.indexOf(kw)>=0)score+=2;});
        // Also check partial word match
        var words=ql.split(/\s+/);
        item.k.forEach(function(kw){words.forEach(function(w){if(kw.indexOf(w)>=0||w.indexOf(kw)>=0)score+=0.5;});});
        if(score>bestScore){bestScore=score;best=item;}
    });
    if(bestScore>=1)return best.a;
    // Default responses
    var defaults=[
        '这是一个好问题！建议你试试左侧的"📐 语法练习"模式，里面有50道语法题可以练习。',
        '我理解你的问题。你可以试试本平台的"词汇宝典"或"模拟考试"功能来针对性练习。',
        '关于这个问题，你可以查看侧边栏的"新手入门指南"页面，有详细的备考路径说明。',
        '建议去"写作模板+范文"页面看看，有写作万能模板和高分替换词。',
        '这个问题可以问得更具体一些吗？比如你想了解哪个科目的备考方法？'
    ];
    return defaults[Math.floor(Math.random()*defaults.length)];
}

// ===== MODE SWITCH =====
function switchAIMode(mode,btn){
    document.querySelectorAll('.aicoach-mode-btn').forEach(function(b){b.classList.remove('active');});
    if(btn)btn.classList.add('active');
    aiCoachMode=mode;
    aiCoachHistory=[];
    var chat=document.getElementById('aiCoachChat');
    var wa=document.getElementById('aiWritingArea');
    var sp=document.getElementById('aiSpeakingPanel');
    if(wa)wa.style.display=(mode==='writing')?'flex':'none';
    if(sp)sp.style.display=(mode==='speaking')?'flex':'none';
    var vb=document.getElementById('aiVoiceBtn');
    if(vb)vb.style.display=(mode==='speaking'||mode==='free')?'inline-flex':'none';
    renderAIQuickActions();
    if(chat){chat.innerHTML='';}
    var welcomes={
        speaking:'🎙️ <strong>口语训练模式</strong> 已激活。<br>点击"随机话题卡"获取题目 →"开始准备"计时60秒 →"开始回答"计时120秒 → 查看范文对比。<br>你也可以用🎤语音输入来练习发音！',
        writing:'✍️ <strong>写作批改模式</strong> 已激活。<br>在下方文本区粘贴你的雅思作文（Task1或Task2），点击"分析评分"，系统会自动统计字数/段落/衔接词/句子长度，检测常见语法错误并估算Band分数。',
        vocab:'📚 <strong>词汇导师模式</strong> 已激活。<br>输入任意英文单词（如"environment"），系统会从3900词库中查找并展示：中文释义+音标+例句+词性+话题分类。<br>也可以输入话题名称（如"教育"）查看该话题的高频词。',
        grammar:'📐 <strong>语法练习模式</strong> 已激活。<br>题库有50道雅思语法选择题，每道题即时反馈+讲解。点击"随机出题"开始练习。<br>你也可以输入有疑问的句子，让系统帮你检查常见错误。',
        free:'💬 <strong>备考问答模式</strong> 已激活。<br>你可以问我关于雅思的任何问题：考试结构、评分标准、备考计划、各科技巧、词汇量要求等。<br>例如输入"如何备考"或"写作怎么提高"试试看。'
    };
    addAICoachMsg('ai',welcomes[mode]||welcomes.free);
}

// ===== QUICK ACTIONS =====
function renderAIQuickActions(){
    var container=document.getElementById('aiQuickActions');
    if(!container)return;
    var acts={
        speaking:[
            {l:'🎲 随机话题卡',f:function(){aiSpeakingNewTopic();}},
            {l:'🎧 朗读话题',f:function(){aiSpeakTopic();}},
            {l:'👁️ 查看范文',f:function(){aiShowSampleAnswer();}},
            {l:'📋 Part1 问答',f:function(){aiPart1Practice();}},
            {l:'🔄 下一个话题',f:function(){aiSpeakingNewTopic();}}
        ],
        writing:[
            {l:'📊 Task1练习',f:function(){addAICoachMsg('ai','<strong>Task 1 练习题目：</strong><br>The chart below shows the percentage of households with internet access in three countries from 2000 to 2020.<br>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.<br><br>请在下方文本区写150词以上的描述。');}},
            {l:'📝 Task2练习',f:function(){addAICoachMsg('ai','<strong>Task 2 练习题目：</strong><br>Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?<br><br>请在下方文本区写250词以上的议论文。');}},
            {l:'📖 评分标准',f:function(){addAICoachMsg('ai','<strong>雅思写作四维度评分标准：</strong><br><br>1. TA/TR (任务完成)：是否完整回答问题<br>2. CC (连贯衔接)：段落逻辑+衔接词<br>3. LR (词汇资源)：词汇多样性和准确性<br>4. GRA (语法范围)：句型多样性和语法准确<br><br>每项0-9分，平均后为写作总分。');}},
            {l:'💡 常见错误',f:function(){addAICoachMsg('ai','⚠️ <strong>写作常见10大错误：</strong><br>1. "I am agree" → "I agree"<br>2. "more better" → "better"<br>3. "peoples" → "people"<br>4. "Despite of" → "Despite"<br>5. "According to me" → "In my opinion"<br>6. "discuss about" → "discuss"<br>7. "can able to" → "can"<br>8. "In the other hand" → "On the other hand"<br>9. there/their/they\'re 混淆<br10. its/it\'s 混淆');}},
            {l:'🔄 清空重来',f:function(){document.getElementById('aiCoachChat').innerHTML='';document.getElementById('aiWritingInput').value='';}}
        ],
        vocab:[
            {l:'🔍 查单词',f:function(){var w=prompt('请输入要查询的英文单词:','');if(w)aiVocabLookup(w.trim().toLowerCase());}},
            {l:'🎓 教育话题词',f:function(){aiTopicVocab('education');}},
            {l:'🌍 环境话题词',f:function(){aiTopicVocab('environment');}},
            {l:'💻 科技话题词',f:function(){aiTopicVocab('technology');}},
            {l:'🎯 随机测词',f:function(){aiRandomVocabQuiz();}}
        ],
        grammar:[
            {l:'📝 随机出题',f:function(){aiGrammarQuiz();}},
            {l:'📊 看成绩',f:function(){aiGrammarScore();}},
            {l:'🔄 重做错题',f:function(){aiGrammarRedoWrong();}},
            {l:'📖 语法点列表',f:function(){addAICoachMsg('ai','<strong>语法题库覆盖知识点：</strong><br>• 时态（一般现在/过去/完成/将来完成）<br>• 从句（定语从句/条件句/虚拟语气）<br>• 介词搭配<br>• 主谓一致<br>• 倒装句<br>• 固定搭配<br>• 冠词<br><br>共50题，每次随机抽取。');}},
            {l:'🔍 检查句子',f:function(){var s=prompt('请输入你想检查的英文句子:','');if(s)aiCheckSentence(s);}}
        ],
        free:[
            {l:'📋 如何备考',f:function(){addAICoachMsg('user','如何备考雅思？');addAICoachMsg('ai',aiMatchFAQ('如何备考雅思'));}},
            {l:'📊 分数计算',f:function(){addAICoachMsg('user','雅思怎么算分？');addAICoachMsg('ai',aiMatchFAQ('分数怎么算'));}},
            {l:'🎤 口语技巧',f:function(){addAICoachMsg('user','口语怎么提高？');addAICoachMsg('ai',aiMatchFAQ('口语怎么提高'));}},
            {l:'✍️ 写作技巧',f:function(){addAICoachMsg('user','写作怎么提高？');addAICoachMsg('ai',aiMatchFAQ('写作怎么提高'));}},
            {l:'📚 词汇量',f:function(){addAICoachMsg('user','雅思需要多少词汇量？');addAICoachMsg('ai',aiMatchFAQ('需要多少词汇量'));}}
        ]
    };
    var actions=acts[aiCoachMode]||acts.free;
    container.innerHTML=actions.map(function(a,i){
        return '<button class="aicoach-quick" onclick="aiQuickActs['+i+']()">'+a.l+'</button>';
    }).join('');
    // Store function refs
    window.aiQuickActs=actions.map(function(a){return a.f;});
}

// ===== SPEAKING MODE FUNCTIONS =====
function aiSpeakingNewTopic(){
    var idx=aiSpeakingTopicIdx % AI_SPEAKING_CARDS.length;
    var card=AI_SPEAKING_CARDS[idx];
    aiSpeakingTopicIdx++;
    document.getElementById('aiSpeakingTopic').textContent='📋 '+card.topic;
    document.getElementById('aiSpeakingPrompts').innerHTML=card.prompts.map(function(p){return '• '+p;}).join('<br>');
    document.getElementById('aiPrepBtn').style.display='inline-flex';
    document.getElementById('aiSpeakBtn').style.display='none';
    document.getElementById('aiTimerDisplay').style.display='none';
    if(aiTimerId){clearInterval(aiTimerId);aiTimerId=null;}
    addAICoachMsg('ai','📋 <strong>话题卡：</strong>'+card.topic+'<br><br>准备要点：<br>'+card.prompts.map(function(p){return '• '+p;}).join('<br>')+'<br><br>👆 点击上方"开始准备"启动1分钟倒计时。');
    document.getElementById('aiCoachChat').scrollTop=document.getElementById('aiCoachChat').scrollHeight;
}
function aiStartPrep(){
    document.getElementById('aiPrepBtn').style.display='none';
    document.getElementById('aiSpeakBtn').style.display='inline-flex';
    var disp=document.getElementById('aiTimerDisplay');
    disp.style.display='block';disp.textContent='⏱️ 准备: 60s';
    aiTimerSeconds=60;
    if(aiTimerId)clearInterval(aiTimerId);
    aiTimerId=setInterval(function(){
        aiTimerSeconds--;disp.textContent='⏱️ 准备: '+aiTimerSeconds+'s';
        if(aiTimerSeconds<=0){clearInterval(aiTimerId);aiTimerId=null;disp.textContent='⏱️ 时间到! 请开始回答';}
    },1000);
    addAICoachMsg('system','⏱️ 1分钟准备时间开始 — 请思考你的回答要点');
}
function aiStartSpeaking(){
    document.getElementById('aiSpeakBtn').style.display='none';
    var disp=document.getElementById('aiTimerDisplay');
    disp.style.display='block';disp.textContent='🎙️ 回答: 120s';
    aiTimerSeconds=120;
    if(aiTimerId)clearInterval(aiTimerId);
    aiTimerId=setInterval(function(){
        aiTimerSeconds--;disp.textContent='🎙️ 回答: '+aiTimerSeconds+'s';
        if(aiTimerSeconds<=0){clearInterval(aiTimerId);aiTimerId=null;disp.textContent='✅ 回答结束! 查看范文对比吧';}
    },1000);
    addAICoachMsg('system','🎙️ 2分钟回答时间开始 — 请开始你的口语回答');
}
function aiShowSampleAnswer(){
    var idx=(aiSpeakingTopicIdx-1+AI_SPEAKING_CARDS.length)%AI_SPEAKING_CARDS.length;
    var card=AI_SPEAKING_CARDS[idx];
    var words=card.sample.split(/\s+/).length;
    addAICoachMsg('ai','👁️ <strong>范文答案</strong> ('+words+'词, ~'+(Math.round(words/150*10)/10)+'分钟):<br><br>'+card.sample+'<br><br>💡 <strong>对比要点：</strong><br>• 范文覆盖了所有提示要点吗？<br>• 用了哪些连接词？<br>• 词汇和句型可以怎么提升？');
    document.getElementById('aiCoachChat').scrollTop=document.getElementById('aiCoachChat').scrollHeight;
}
function aiPart1Practice(){
    var p1qs=['What do you do?','Where are you from?','Do you work or study?','What are your hobbies?','Do you like cooking?','What kind of music do you like?','Do you enjoy traveling?','How do you usually spend weekends?'];
    var q=p1qs[Math.floor(Math.random()*p1qs.length)];
    addAICoachMsg('ai','🎙️ <strong>Part 1 问答练习</strong><br><br>考官: '+q+'<br><br>💡 大声回答这个问题，用🎤语音输入或打字回答。回答15-20秒即可。');
}
function aiSpeakTopic(){
    var idx=(aiSpeakingTopicIdx-1+AI_SPEAKING_CARDS.length)%AI_SPEAKING_CARDS.length;
    var card=AI_SPEAKING_CARDS[idx];
    if(window.speechSynthesis){
        var u=new SpeechSynthesisUtterance(card.topic);
        u.lang='en-US';u.rate=0.85;
        speechSynthesis.cancel();speechSynthesis.speak(u);
        showToast('🔊 正在朗读话题...');
    }else{showToast('浏览器不支持语音合成');}
}

// ===== WRITING MODE =====
function submitAICoachWriting(){
    var essay=document.getElementById('aiWritingInput').value.trim();
    if(!essay){showToast('请先粘贴作文');return;}
    var result=analyzeWriting(essay);
    var bandClass=result.bandEst>=7?'high':(result.bandEst>=5.5?'mid':'low');
    var html='📊 <strong>写作分析报告</strong><br><br>';
    html+='<strong>基本统计：</strong><br>';
    html+='• 总词数：'+result.wordCount+'词'+(result.wordCount>=250?' ✅':(result.wordCount>=150?' ⚠️':' ❌'))+'<br>';
    html+='• 句子数：'+result.sentenceCount+'句<br>';
    html+='• 平均句长：'+result.avgWordsPerSentence+'词/句<br>';
    html+='• 段落数：'+result.paraCount+'段<br>';
    html+='• 衔接词：'+result.linkerCount+'个 '+result.foundLinkers.slice(0,6).join(', ')+(result.foundLinkers.length>6?'...':'')+'<br><br>';
    html+='<strong>预估Band：</strong><span class="aicoach-score '+bandClass+'">'+result.bandEst.toFixed(1)+'</span><br><br>';
    html+='<strong>逐项反馈：</strong><br>'+result.feedback.map(function(f){return '• '+f;}).join('<br>')+'<br><br>';
    if(result.commonErrors.length>0){
        html+='<strong>检测到的常见错误：</strong><br>'+result.commonErrors.map(function(e){return '• '+e;}).join('<br>')+'<br><br>';
    }
    html+='<strong>💡 提分建议：</strong><br>';
    if(result.wordCount<250)html+='1. 扩充内容，确保Task2达到250词以上。<br>';
    if(result.paraCount<4)html+=(result.wordCount<250?'2':'1')+'. 增加段落，建议4段式：开头+2段主体+结尾。<br>';
    if(result.linkerCount<4)html+='. 多用衔接词：Firstly, Moreover, However, Therefore, In conclusion。<br>';
    if(result.avgWordsPerSentence<12)html+='. 尝试写复合句：用which/who/because/although连接短句。<br>';
    html+='. 参考写作页面的"替换词组"Tab积累高级词汇。';
    addAICoachMsg('ai',html);
}

// ===== VOCAB MODE =====
function aiVocabLookup(word){
    var results=[];
    if(typeof V!=='undefined'){
        for(var i=0;i<V.length;i++){
            if(V[i][0].toLowerCase()===word||V[i][0].toLowerCase().indexOf(word)>=0){
                results.push(V[i]);
                if(results.length>=5)break;
            }
        }
    }
    if(results.length===0){
        addAICoachMsg('ai','❌ 未找到"<strong>'+word+'</strong>"。请检查拼写，或尝试搜索词根。<br>提示：你可以输入话题名如 education / environment 查看该话题词汇。');
        return;
    }
    var html='🔍 查询 "<strong>'+word+'</strong>" — 找到 '+results.length+' 个结果：<br><br>';
    results.forEach(function(w){
        html+='<div style="background:var(--bg);padding:10px;border-radius:8px;margin-bottom:8px">';
        html+='<strong style="font-size:1.1rem;color:var(--p)">'+w[0]+'</strong> ';
        html+='<span style="color:var(--t2)">'+w[1]+'</span> ';
        html+='<span class="tag">'+w[2]+'</span> ';
        html+='<span class="tag" style="background:#D1FAE5;color:#065F46">'+w[3]+'</span> ';
        html+='<span class="tag" style="background:#FEF3C7;color:#92400E">'+w[4]+'</span><br>';
        html+='<span style="font-size:0.82rem;color:var(--t2)">'+w[5]+'</span><br>';
        html+='<span style="font-size:0.82rem">📝 '+w[6]+'</span>';
        html+='</div>';
    });
    addAICoachMsg('ai',html);
}
function aiTopicVocab(topic){
    if(typeof TOPIC_DATA!=='undefined'&&TOPIC_DATA[topic]){
        var data=TOPIC_DATA[topic];
        var html='📚 <strong>'+data.label+' 话题高频词</strong> ('+data.vocab.length+'词)：<br><br>';
        data.vocab.slice(0,10).forEach(function(w){
            html+='<strong>'+w[0]+'</strong> — '+w[1]+' <span style="font-size:0.75rem;color:var(--t2)">'+w[5]+'</span><br>📝 '+w[6]+'<br><br>';
        });
        if(data.vocab.length>10)html+='<br>... 更多词汇请查看"词汇宝典"页面';
        addAICoachMsg('ai',html);
    }else{
        aiVocabLookup(topic);
    }
}
function aiRandomVocabQuiz(){
    if(typeof V==='undefined'){addAICoachMsg('ai','词汇库未加载');return;}
    var idx=Math.floor(Math.random()*V.length);
    var w=V[idx];
    var html='🎯 <strong>随机词汇测试</strong><br><br>';
    html+='<div style="text-align:center;font-size:1.6rem;font-weight:900;color:var(--p);padding:16px">'+w[0]+'</div>';
    html+='<div style="text-align:center;color:var(--t2)">'+w[5]+'</div><br>';
    html+='<details><summary>👁️ 点击查看答案</summary>';
    html+='中文：<strong>'+w[1]+'</strong><br>';
    html+='词性：'+w[2]+' | 话题：'+w[3]+' | 等级：'+w[4]+'<br>';
    html+='例句：'+w[6]+'</details>';
    addAICoachMsg('ai',html);
}

// ===== GRAMMAR MODE =====
var aiGrammarWrong=[];
var aiGrammarCorrect=0;
var aiGrammarTotal=0;
var aiGrammarCurrent=null;

function aiGrammarQuiz(){
    var idx=Math.floor(Math.random()*AI_GRAMMAR_QUIZ.length);
    aiGrammarCurrent=AI_GRAMMAR_QUIZ[idx];
    var html='📝 <strong>语法练习</strong> (第'+(aiGrammarTotal+1)+'题)<br><br>';
    html+='<strong>'+aiGrammarCurrent.q+'</strong><br><br>';
    var letters=['A','B','C','D'];
    aiGrammarCurrent.opts.forEach(function(opt,i){
        html+='<button class="quiz-opt" style="margin:3px;font-size:0.85rem" onclick="aiGrammarAnswer('+i+',this)">'+letters[i]+'. '+opt+'</button> ';
    });
    html+='<div id="aiGrammarFb" style="margin-top:8px"></div>';
    addAICoachMsg('ai',html);
}
function aiGrammarAnswer(idx,btn){
    if(!aiGrammarCurrent)return;
    aiGrammarTotal++;
    var fb=document.getElementById('aiGrammarFb');
    if(!fb)return;
    var correct=aiGrammarCurrent.ans;
    var letters=['A','B','C','D'];
    // Disable all buttons in the last message
    var allBtns=btn.parentElement.querySelectorAll('.quiz-opt');
    allBtns.forEach(function(b){b.style.pointerEvents='none';});
    allBtns[correct].classList.add('correct');
    if(idx===correct){
        aiGrammarCorrect++;
        fb.innerHTML='<div class="quiz-fb ok show">✅ 正确! '+aiGrammarCurrent.explain+'</div>';
    }else{
        allBtns[idx].classList.add('wrong');
        aiGrammarWrong.push(aiGrammarCurrent);
        fb.innerHTML='<div class="quiz-fb err show">❌ 错误。正确答案是 '+letters[correct]+'。'+aiGrammarCurrent.explain+'</div>';
    }
    fb.innerHTML+='<div style="margin-top:6px">📊 正确率: '+aiGrammarCorrect+'/'+aiGrammarTotal+' ('+Math.round(aiGrammarCorrect/Math.max(1,aiGrammarTotal)*100)+'%)</div>';
    document.getElementById('aiCoachChat').scrollTop=document.getElementById('aiCoachChat').scrollHeight;
}
function aiGrammarScore(){
    if(aiGrammarTotal===0){addAICoachMsg('ai','你还没有做过语法题。点击"随机出题"开始吧！');return;}
    var pct=Math.round(aiGrammarCorrect/aiGrammarTotal*100);
    var level=pct>=90?'🎉 优秀! 语法基础扎实':(pct>=70?'👍 良好! 继续加强':(pct>=50?'📖 需要多练习':(pct>=30?'⚠️ 语法需要加强':'🔴 建议系统学习语法')));
    addAICoachMsg('ai','📊 <strong>语法成绩单</strong><br><br>总题数: '+aiGrammarTotal+'<br>正确: '+aiGrammarCorrect+'<br>错误: '+aiGrammarWrong.length+'<br>正确率: '+pct+'%<br><br>'+level);
}
function aiGrammarRedoWrong(){
    if(aiGrammarWrong.length===0){addAICoachMsg('ai','没有错题！太棒了 🎉');return;}
    var q=aiGrammarWrong.shift();
    aiGrammarCurrent=q;
    var html='🔄 <strong>错题重做</strong> (还剩'+aiGrammarWrong.length+'道错题)<br><br>';
    html+='<strong>'+q.q+'</strong><br><br>';
    var letters=['A','B','C','D'];
    q.opts.forEach(function(opt,i){
        html+='<button class="quiz-opt" style="margin:3px;font-size:0.85rem" onclick="aiGrammarRedoAnswer('+i+',this)">'+letters[i]+'. '+opt+'</button> ';
    });
    html+='<div id="aiGrammarRedoFb" style="margin-top:8px"></div>';
    addAICoachMsg('ai',html);
}
function aiGrammarRedoAnswer(idx,btn){
    if(!aiGrammarCurrent)return;
    var fb=document.getElementById('aiGrammarRedoFb');
    if(!fb)return;
    var correct=aiGrammarCurrent.ans;
    var allBtns=btn.parentElement.querySelectorAll('.quiz-opt');
    allBtns.forEach(function(b){b.style.pointerEvents='none';});
    allBtns[correct].classList.add('correct');
    var letters=['A','B','C','D'];
    if(idx===correct){fb.innerHTML='<div class="quiz-fb ok show">✅ 这次对了! '+aiGrammarCurrent.explain+'</div>';}
    else{allBtns[idx].classList.add('wrong');aiGrammarWrong.push(aiGrammarCurrent);fb.innerHTML='<div class="quiz-fb err show">❌ 还是错了。正确答案 '+letters[correct]+'。'+aiGrammarCurrent.explain+'</div>';}
}
function aiCheckSentence(sentence){
    var issues=[];
    if(sentence.match(/\bi am agree\b/gi))issues.push('❌ "I am agree" → "I agree"');
    if(sentence.match(/\bmore better\b/gi))issues.push('❌ "more better" → "better"');
    if(sentence.match(/\bpeoples\b/gi))issues.push('❌ "peoples" → "people"');
    if(sentence.match(/\bDespite of\b/gi))issues.push('❌ "Despite of" → "Despite"');
    if(sentence.match(/\bcan able to\b/gi))issues.push('❌ "can able to" → "can" 或 "able to"');
    if(sentence.match(/\baccording to me\b/gi))issues.push('❌ "According to me" → "In my opinion"');
    if(sentence.match(/\bdiscuss about\b/gi))issues.push('❌ "discuss about" → "discuss"');
    if(sentence.match(/\bin the other hand\b/gi)&&!sentence.match(/\bon the other hand\b/gi))issues.push('❌ "In the other hand" → "On the other hand"');
    if(!sentence.match(/[.!?]$/))issues.push('⚠️ 句子结尾缺少标点符号');
    if(sentence.split(/\s+/).length<4)issues.push('⚠️ 句子很短，检查是否完整');
    if(issues.length===0)issues.push('✅ 未检测到常见错误。句子看起来不错！');
    addAICoachMsg('ai','🔍 <strong>句子检查结果：</strong><br><br>原文：'+sentence+'<br><br>'+issues.join('<br>'));
}

// ===== SEND / VOICE / HELPERS =====
function sendAICoach(){
    var input=document.getElementById('aiCoachInput');
    var msg=input.value.trim();
    if(!msg)return;
    addAICoachMsg('user',msg);
    input.value='';
    aiCoachHistory.push({role:'user',text:msg});
    if(aiCoachHistory.length>20)aiCoachHistory=aiCoachHistory.slice(-20);

    if(aiCoachMode==='vocab'){
        aiVocabLookup(msg.toLowerCase());
    }else if(aiCoachMode==='grammar'){
        aiCheckSentence(msg);
    }else if(aiCoachMode==='free'){
        var answer=aiMatchFAQ(msg);
        setTimeout(function(){addAICoachMsg('ai',answer);},300+Math.random()*500);
    }else if(aiCoachMode==='writing'){
        addAICoachMsg('ai','请在下方文本区粘贴完整的作文，然后点击"📊 分析评分"按钮获取详细反馈。');
    }else if(aiCoachMode==='speaking'){
        addAICoachMsg('ai','💡 使用上方的口语训练面板：<br>1. 点击"🎲 随机话题卡"获取练习话题<br>2. 点击"⏱️ 开始准备"启动倒计时<br>3. 点击"🎙️ 开始回答"练习口语<br>4. 点击"👁️ 查看范文"对比学习<br>5. 也可以用🎤语音输入来录音练习');
    }
}

function addAICoachMsg(role,html){
    var chat=document.getElementById('aiCoachChat');
    if(!chat)return;
    var div=document.createElement('div');
    div.className='aicoach-msg '+role;
    div.innerHTML=html;
    chat.appendChild(div);
    chat.scrollTop=chat.scrollHeight;
}

// Voice input
var aiCoachRecognition=null;
function startAICoachVoice(){
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){showToast('语音输入需Chrome/Edge浏览器');return;}
    if(!aiCoachRecognition){
        aiCoachRecognition=new SR();
        aiCoachRecognition.lang='en-US';aiCoachRecognition.interimResults=false;
        aiCoachRecognition.onresult=function(e){document.getElementById('aiCoachInput').value=e.results[0][0].transcript;showToast('🎤 识别完成');document.getElementById('aiVoiceBtn').textContent='🎤';};
        aiCoachRecognition.onerror=function(){document.getElementById('aiVoiceBtn').textContent='🎤';showToast('语音识别失败');};
        aiCoachRecognition.onend=function(){document.getElementById('aiVoiceBtn').textContent='🎤';};
    }
    try{aiCoachRecognition.start();document.getElementById('aiVoiceBtn').textContent='🔴';showToast('正在聆听...说英文');}catch(e){showToast('无法启动');}
}

// Init
function initAICoach(){
    renderAIQuickActions();
}
