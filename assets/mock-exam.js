// ===== 20套完整模拟考试系统 =====
// 每套包含: 听力4个Section + 阅读3篇Passage + 写作Task1+Task2
// 随机轮换，每次打开随机分配一套

// ===== LISTENING POOL (20 sections total) =====
const listeningPool = [
    // Section 1-4 from existing exercises
    {script:'Hello. I would like to book a room for two nights, please. The date would be the 15th and 16th of July. I need a single room with a sea view if possible. The name is John Smith. My phone number is 07700 900 458.',
     qs:[{q:'The guest wants ____ nights.',ans:'two'},{q:'The dates are July ____ and 16th.',ans:'15th'},{q:'The guest name is ____ Smith.',ans:'John'}]},
    {script:'Attention please. The university library will be closed for renovation from August 1st to August 15th. During this period, students can use the temporary library in Building C, which will be open from 8am to 6pm, Monday to Friday. All books borrowed before July 25th must be returned by August 20th.',
     qs:[{q:'The library closes from August 1st to August ____.',ans:'15th'},{q:'The temporary library is in Building ____.',ans:'C'},{q:'Books borrowed before July 25th must be returned by August ____.',ans:'20th'}]},
    {script:'Hi Professor. I would like to register for your Introduction to Psychology course. However, I notice that the Tuesday morning session is full. Is there another time available? Yes, we have a Wednesday afternoon session from 2pm to 4pm, and also a Thursday evening session from 6pm to 8pm. The Wednesday one sounds perfect. Great, I will add you to the list. The course starts on September the 10th.',
     qs:[{q:'The course is Introduction to ____.',ans:'Psychology'},{q:'The Wednesday session is from ____ to 4pm.',ans:'2pm'},{q:'The course starts on September ____.',ans:'10th'}]},
    {script:'Welcome to the City Bus Tour. The tour departs from the Central Station every hour, starting at 9am. The last tour leaves at 5pm. The full tour takes approximately 2 hours and 15 minutes. The ticket price is 25 pounds for adults and 15 pounds for children under 12. You can purchase tickets from the driver or at the ticket office. The tour covers 15 major attractions including the Old Castle, the National Museum, and the Riverside Park. Audio guides are available in 8 languages.',
     qs:[{q:'The first tour departs at ____.',ans:'9am'},{q:'The full tour takes ____ hours and 15 minutes.',ans:'two'},{q:'Children under 12 pay ____ pounds.',ans:'15'},{q:'The tour covers ____ major attractions.',ans:'15'}]},
    {script:'Good morning, Dr. Wilson\'s office. How can I help you? Hi, I\'d like to make an appointment please. I\'ve been having headaches for about a week. Let me check the schedule. Dr. Wilson is available on Thursday morning at 10:30 or Friday afternoon at 2:15. Friday at 2:15 works for me. Can I have your name and date of birth please? Yes, it\'s Sarah Thompson. Date of birth is March 14th, 1985. Thank you, Sarah. Please arrive 15 minutes before your appointment and bring your insurance card.',
     qs:[{q:'The patient has been having ____ for about a week.',ans:'headaches'},{q:'The Friday appointment is at ____.',ans:'2:15'},{q:'The patient\'s surname is ____.',ans:'Thompson'},{q:'Arrive ____ minutes before the appointment.',ans:'15'}]},
    {script:'Good morning everyone and welcome to the University of Westbrook. My name is David and I\'ll be your guide today. Our tour will last about 45 minutes. We\'ll start here at the main entrance, then visit the library which houses over 2 million books. After that, we will see the Science Building, completed in 2018 at a cost of 45 million pounds. The university was founded in 1892 and currently has 22,000 students from over 120 countries.',
     qs:[{q:'The tour lasts about ____ minutes.',ans:'45'},{q:'The library houses over ____ million books.',ans:'two'},{q:'The university was founded in ____.',ans:'1892'},{q:'The university has students from over ____ countries.',ans:'120'}]},
    {script:'Hello, this is Mike from the Marketing Department. I need to order some office supplies. We need 500 sheets of A4 paper, 20 black ink cartridges for the HP printer, and 15 notebooks. Actually, make that 10 notebooks—we have some left from last month. Could you also include 5 packs of sticky notes? The delivery address is Building D, 3rd Floor, Room 312. The order code for our department is MK-447. We need these by Friday at the latest.',
     qs:[{q:'The caller is from the ____ Department.',ans:'Marketing'},{q:'They need ____ ink cartridges.',ans:'20'},{q:'The delivery is to Building D, Room ____.',ans:'312'},{q:'The order code is ____.',ans:'MK-447'}]},
    {script:'Here is the weather forecast for the next three days. Tuesday will be mostly cloudy with a high of 18 degrees and a low of 12 degrees. There is a 60 percent chance of rain in the afternoon. Wednesday will be sunny and warmer, with temperatures reaching 23 degrees. Thursday will see strong winds from the northwest at 40 kilometers per hour, with temperatures dropping to around 15 degrees. The weekend outlook is more promising, with clear skies expected on both Saturday and Sunday, and temperatures climbing back to around 25 degrees.',
     qs:[{q:'Tuesday has a ____ percent chance of rain.',ans:'60'},{q:'Wednesday\'s temperature will reach ____ degrees.',ans:'23'},{q:'Thursday\'s wind is from the ____.',ans:'northwest'},{q:'The weekend temperature will be around ____ degrees.',ans:'25'}]},
    {script:'Thank you for attending this information session about our study abroad program. The application deadline for the spring semester is October 15th. To apply, you need a minimum GPA of 3.0 and must have completed at least 60 credit hours. The program fee is 8,500 dollars, which includes tuition, accommodation, and two cultural excursions. However, flights and meals are not included. Scholarships are available—students can apply for up to 2,000 dollars in financial aid. For more information, visit the International Office in Room 204 of the Student Center, open Monday through Thursday from 9 to 4.',
     qs:[{q:'The application deadline is October ____.',ans:'15th'},{q:'Students need a minimum GPA of ____.',ans:'3.0'},{q:'The program fee is ____ dollars.',ans:'8500'},{q:'The International Office is in Room ____.',ans:'204'}]},
    {script:'Good morning, this is your 8 o\'clock traffic update. There has been a major accident on the M25 motorway between Junction 8 and Junction 9, and traffic is backed up for approximately 5 miles. Drivers are advised to use the A3 as an alternative route. On the railway, there are delays of up to 30 minutes on the Southern line due to signal failure at East Croydon station. The London Underground is running normally on all lines except the Central Line, which has minor delays between Liverpool Street and Stratford. The congestion charge zone has been extended to include areas west of Park Lane starting from next Monday.',
     qs:[{q:'The accident is between Junction ____ and Junction 9.',ans:'8'},{q:'Drivers should use the ____ as an alternative route.',ans:'A3'},{q:'Trains are delayed up to ____ minutes on the Southern line.',ans:'30'},{q:'The congestion charge extension starts next ____.',ans:'Monday'}]},
    // New listening sections 11-20
    {script:'Hello, I\'m calling about the apartment for rent on Park Street. The one with two bedrooms? Yes, that\'s right. Could you tell me the monthly rent? It\'s 850 pounds per month, not including utilities. Is there parking available? Yes, there is one parking space included. Pets are allowed with a deposit of 200 pounds. When would it be available? The current tenant moves out on June 30th, so it would be available from July 1st. I\'d like to arrange a viewing please. How about Thursday at 3pm?',
     qs:[{q:'The apartment has ____ bedrooms.',ans:'two'},{q:'The monthly rent is ____ pounds.',ans:'850'},{q:'The pet deposit is ____ pounds.',ans:'200'},{q:'The apartment is available from July ____.',ans:'1st'}]},
    {script:'Welcome to the Museum of Natural History. General admission is 12 pounds for adults and 6 pounds for students. Children under 12 enter free. We recommend starting with the Dinosaur Gallery on the ground floor, which features a complete Tyrannosaurus Rex skeleton. The Human Origins exhibition on the first floor is very popular. The museum is open from 10am to 5:30pm daily, with the last admission at 4:45pm. Guided tours are available at 11am and 2pm and cost an additional 5 pounds per person. The museum café is on the ground floor next to the gift shop.',
     qs:[{q:'Adult admission is ____ pounds.',ans:'12'},{q:'Children under 12 enter ____.',ans:'free'},{q:'The museum closes at ____.',ans:'5:30pm'},{q:'Guided tours cost an additional ____ pounds.',ans:'5'}]},
    {script:'Excuse me, I\'d like to open a bank account. Certainly. Do you have an appointment? No, I don\'t. Is this your first account with us? Yes, I just moved here for work. I\'ll need your passport and proof of address—a utility bill or rental agreement will do. I have my passport and a council tax bill. That will work. There are two types of accounts: a basic current account with no monthly fee, or a premium account at 8 pounds per month that includes travel insurance and mobile phone coverage. I\'ll go with the basic one for now.',
     qs:[{q:'The customer needs a passport and proof of ____.',ans:'address'},{q:'A utility bill or ____ agreement is acceptable.',ans:'rental'},{q:'The premium account costs ____ pounds per month.',ans:'8'},{q:'The premium account includes ____ insurance.',ans:'travel'}]},
    {script:'Good afternoon, this is your flight update for BA472 to New York. The flight has been delayed due to technical issues. The new departure time is estimated to be 6:45 PM, which is 3 hours later than the scheduled time. Passengers are entitled to meal vouchers which can be collected from the service desk at Gate 22. For passengers with connecting flights, please speak to the transfer desk in Terminal 3. We apologize for the inconvenience and will update you with any further changes via the airport announcement system and the airline mobile app.',
     qs:[{q:'The flight number is BA ____.',ans:'472'},{q:'The destination is ____.',ans:'New York'},{q:'The new departure time is ____ PM.',ans:'6:45'},{q:'Meal vouchers can be collected at Gate ____.',ans:'22'}]},
    {script:'Hello everyone, welcome to the orientation for new volunteers at the Community Food Bank. We operate every Tuesday and Thursday from 9am to 3pm. Volunteers typically work in 3-hour shifts. Your main duties will include sorting donated food items by type and checking expiration dates. We also need help with packing food boxes for families—each box contains enough food for about 5 days. Last year, we distributed over 12,000 food boxes to families in need. The volunteer coordinator is Emma Richardson, and you can reach her at extension 405. Please wear comfortable closed-toe shoes as you\'ll be on your feet most of the time.',
     qs:[{q:'The Food Bank operates on Tuesday and ____.',ans:'Thursday'},{q:'Each food box contains enough for ____ days.',ans:'5'},{q:'Last year they distributed over ____ food boxes.',ans:'12000'},{q:'Emma Richardson is at extension ____.',ans:'405'}]},
    {script:'Hi, I\'m calling about the part-time position at the bookstore. Great, the position is for weekend sales assistant—Saturdays and Sundays from 10 to 6. The pay is 9 pounds 50 per hour. We\'re looking for someone with previous retail experience and good communication skills. I worked at a clothing store for two summers, and I\'m a literature student so I love books. That sounds ideal. When can you come in for an interview? We have slots on Wednesday at 11am or Friday at 2pm. Wednesday at 11 is perfect. Just bring your CV and a reference letter from your previous employer.',
     qs:[{q:'The position is for weekend ____ assistant.',ans:'sales'},{q:'The hourly pay is 9 pounds ____.',ans:'50'},{q:'The applicant studied ____.',ans:'literature'},{q:'The interview is on Wednesday at ____.',ans:'11am'}]},
    {script:'This is a public service announcement regarding water conservation. Due to below-average rainfall this year, reservoir levels are at only 45% of capacity. We are asking all residents to reduce water usage by 20%. Please limit showers to 4 minutes, only run dishwashers and washing machines when full, and avoid watering gardens between 10am and 6pm. Violations of these restrictions may result in fines of up to 500 pounds. For more tips on saving water, visit our website at savewater.gov.uk. Thank you for your cooperation.',
     qs:[{q:'Reservoir levels are at only ____% of capacity.',ans:'45'},{q:'Residents should reduce water usage by ____%.',ans:'20'},{q:'Showers should be limited to ____ minutes.',ans:'4'},{q:'Fines can be up to ____ pounds.',ans:'500'}]},
    {script:'Good afternoon, I\'d like to book a conference room for our team meeting next month. Certainly. We need a room for 25 people with a projector and whiteboard. Let me check. We have the Oak Room available on March 12th or 18th. The 12th works better. The full-day rate is 350 pounds, which includes tea, coffee, and a buffet lunch. Setup starts at 8am and the room must be vacated by 5:30pm. We also need to know about dietary requirements for the buffet at least 3 days in advance. Perfect, please reserve the 12th for our team.',
     qs:[{q:'The meeting is for ____ people.',ans:'25'},{q:'The room costs ____ pounds for a full day.',ans:'350'},{q:'The room must be vacated by ____.',ans:'5:30pm'},{q:'Dietary requirements need ____ days advance notice.',ans:'3'}]},
    {script:'Hello, I\'m interested in joining the gym. Our membership options: a monthly plan at 35 pounds, or a yearly plan at 350 pounds which saves you 70 pounds compared to paying monthly. What facilities do you have? We have a swimming pool, a fully equipped weight room, and over 40 group fitness classes per week including yoga, spinning, and boxing. We also offer personal training sessions at 40 pounds per hour. New members get a free fitness assessment and two complimentary personal training sessions. The gym is open from 6am to 10pm on weekdays and 8am to 8pm on weekends.',
     qs:[{q:'The monthly plan costs ____ pounds.',ans:'35'},{q:'The yearly plan saves ____ pounds.',ans:'70'},{q:'Personal training costs ____ pounds per hour.',ans:'40'},{q:'New members get ____ free personal training sessions.',ans:'two'}]},
    {script:'Good morning shoppers. Just a reminder that today is the last day of our Summer Sale with discounts of up to 70% on selected items. All home appliances on the third floor are buy one get one half price. Clothing on the second floor is reduced by an additional 15% at the checkout. The food court on the ground floor is offering a free dessert with any main meal purchase. The store will close at 9pm today, which is one hour later than usual. Free parking is available for the first 3 hours—please validate your ticket at any customer service desk.',
     qs:[{q:'The Summer Sale has discounts of up to ____%.',ans:'70'},{q:'Home appliances are on the ____ floor.',ans:'third'},{q:'The store closes at ____ today.',ans:'9pm'},{q:'Free parking is for the first ____ hours.',ans:'3'}]},
];

// ===== WRITING TASK POOLS =====
const writingTask1Pool = [
    {prompt:'The chart below shows the percentage of households in a European country owning various electronic devices from 1995 to 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',type:'Line Graph'},
    {prompt:'The bar chart shows the average monthly spending by British households on different categories in 1990, 2000, and 2010. Summarise the information and make comparisons.',type:'Bar Chart'},
    {prompt:'The pie charts show the proportion of energy produced from different sources in France in 2000 and 2020. Summarise the information and make comparisons.',type:'Pie Charts'},
    {prompt:'The table shows information about the number of international students enrolled in four different universities between 2010 and 2020. Summarise the information and make comparisons.',type:'Table'},
    {prompt:'The diagram shows how plastic bottles are recycled. Summarise the information by selecting and reporting the main features.',type:'Process Diagram'},
    {prompt:'The maps show the changes to a coastal town between 1990 and 2020. Summarise the information and make comparisons.',type:'Maps'},
    {prompt:'The line graph shows the number of visitors to three different museums in London from 2000 to 2015. Summarise the information and make comparisons.',type:'Line Graph'},
    {prompt:'The bar chart compares the time spent per week on household chores by men and women in three different age groups. Summarise the information and make comparisons.',type:'Bar Chart'},
    {prompt:'The two pie charts compare the reasons why people chose to study online versus on campus at a UK university in 2022. Summarise the information.',type:'Pie Charts'},
    {prompt:'The table below shows the percentage of workers in five different industries who worked from home in 2019 and 2022. Summarise the information and make comparisons.',type:'Table'},
    {prompt:'The diagram illustrates the life cycle of a butterfly. Summarise the main stages shown in the diagram.',type:'Process Diagram'},
    {prompt:'The maps below show the layout of a university campus in 1990 and the present day. Summarise the changes that have taken place.',type:'Maps'},
    {prompt:'The line graph shows the average monthly temperatures and rainfall in two different cities over a year. Summarise the information by selecting and reporting the main features.',type:'Line Graph'},
    {prompt:'The bar chart shows the most popular leisure activities among teenagers in four different countries. Summarise the information and make comparisons.',type:'Bar Chart'},
    {prompt:'The pie charts show the results of a survey on the most important factors when choosing a job among graduates in 2010 and 2022.',type:'Pie Charts'},
    {prompt:'The table gives information about the sales of Fairtrade-labeled coffee and bananas in five European countries in 2010 and 2020.',type:'Table'},
    {prompt:'The diagram shows the process of making cheese from milk. Summarise the information by selecting and reporting the main features.',type:'Process Diagram'},
    {prompt:'The maps illustrate the development of a shopping center and its surrounding area between 2005 and the present. Summarise the changes.',type:'Maps'},
    {prompt:'The line graph shows the consumption of fast food by Australian teenagers between 2000 and 2020. Summarise the information and make comparisons.',type:'Line Graph'},
    {prompt:'The bar chart compares the percentage of people in different age groups who did regular physical activity in 2010 and 2020. Summarise the information.',type:'Bar Chart'},
];

const writingTask2Pool = [
    {prompt:'Some people believe that in the future, environmental problems will become so severe that humans will need to move to other planets to survive. To what extent do you agree or disagree?',type:'Agree/Disagree'},
    {prompt:'Some people think that governments should invest more money in teaching science subjects rather than other subjects for a country\'s development and progress. To what extent do you agree or disagree?',type:'Agree/Disagree'},
    {prompt:'In many countries, people are living longer than ever before. Some say an aging population creates problems for governments, while others believe there are benefits to having more elderly people in society. Discuss both views and give your opinion.',type:'Discuss Both Views'},
    {prompt:'Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?',type:'Agree/Disagree'},
    {prompt:'Online learning is becoming increasingly popular. Some people believe that this will replace traditional classroom education, while others think it cannot fully substitute face-to-face learning. Discuss both views and give your opinion.',type:'Discuss Both Views'},
    {prompt:'In many cities around the world, traffic congestion has become a serious problem. What are the causes of this problem, and what measures can be taken to solve it?',type:'Problems/Solutions'},
    {prompt:'Some people think that the best way to improve public health is by increasing the number of sports facilities. Others say that this would have little effect and other measures are required. Discuss both views and give your opinion.',type:'Discuss Both Views'},
    {prompt:'International tourism has become a huge industry in the world. Do the benefits of international tourism outweigh the drawbacks?',type:'Advantages/Disadvantages'},
    {prompt:'More and more people are using computers and electronic devices to access information. Therefore, there is no longer a need for printed books, magazines, and newspapers. To what extent do you agree or disagree?',type:'Agree/Disagree'},
    {prompt:'In some countries, the number of people choosing to live alone is increasing rapidly. What are the reasons for this trend, and is it a positive or negative development?',type:'Positive/Negative'},
    {prompt:'Some people believe that children should be taught to compete, while others think they should be taught to cooperate to become useful adults. Discuss both views and give your opinion.',type:'Discuss Both Views'},
    {prompt:'The increasing use of social media by young people has raised concerns about its impact on mental health. What are the problems associated with this trend, and what solutions can be proposed?',type:'Problems/Solutions'},
    {prompt:'Fast food is becoming increasingly popular and is replacing traditional foods in many countries. What are the causes of this trend, and do you think the advantages outweigh the disadvantages?',type:'Advantages/Disadvantages'},
    {prompt:'Some people believe that the government should spend money on building more roads, while others think that money should be spent on improving public transport. Discuss both views and give your opinion.',type:'Discuss Both Views'},
    {prompt:'In many workplaces, there is a growing trend towards flexible working hours. Do you think this is a positive or negative development?',type:'Positive/Negative'},
    {prompt:'With the development of technology, more and more people work from home. Do the advantages of this trend outweigh the disadvantages?',type:'Advantages/Disadvantages'},
    {prompt:'Some people think that parents should teach their children how to be good members of society. Others believe that schools are the best place to learn this. Discuss both views and give your opinion.',type:'Discuss Both Views'},
    {prompt:'Climate change is the biggest threat facing humanity today. Some people believe that only governments and large corporations can address this challenge. To what extent do you agree that individual action is also important?',type:'Agree/Disagree'},
    {prompt:'More and more people are choosing to eat organic food. Why is this happening, and do you think this is a positive or negative trend?',type:'Positive/Negative'},
    {prompt:'Some countries have introduced laws to limit working hours for employees. Why have these laws been introduced, and do you think they are a positive or negative development?',type:'Positive/Negative'},
];

// ===== 20 套完整模拟考试 =====
// 每套从pool中组装: 4个listening + 3个reading + task1 + task2
// reading复用已有的20篇文章，每套取不同的3篇
function build20Exams() {
    // Build 20 unique configurations
    const configs = [
        {L:[0,10,1,11],R:[0,5,10],T1:0,T2:0},
        {L:[2,12,3,13],R:[1,6,11],T1:1,T2:1},
        {L:[4,14,5,15],R:[2,7,12],T1:2,T2:2},
        {L:[6,16,7,17],R:[3,8,13],T1:3,T2:3},
        {L:[8,18,9,19],R:[4,9,14],T1:4,T2:4},
        {L:[1,3,5,7],R:[5,10,15],T1:5,T2:5},
        {L:[9,11,13,15],R:[6,11,16],T1:6,T2:6},
        {L:[2,17,4,19],R:[7,12,17],T1:7,T2:7},
        {L:[0,8,10,18],R:[8,13,18],T1:8,T2:8},
        {L:[6,1,14,3],R:[9,14,19],T1:9,T2:9},
        {L:[12,5,16,9],R:[10,15,0],T1:10,T2:10},
        {L:[7,13,0,10],R:[11,16,1],T1:11,T2:11},
        {L:[15,4,18,6],R:[12,17,2],T1:12,T2:12},
        {L:[17,2,19,8],R:[13,18,3],T1:13,T2:13},
        {L:[11,14,1,5],R:[14,19,4],T1:14,T2:14},
        {L:[3,10,7,16],R:[15,0,5],T1:15,T2:15},
        {L:[19,9,13,4],R:[16,1,6],T1:16,T2:16},
        {L:[5,15,11,2],R:[17,2,7],T1:17,T2:17},
        {L:[8,0,17,12],R:[18,3,8],T1:18,T2:18},
        {L:[16,7,14,1],R:[19,4,9],T1:19,T2:19},
    ];

    const exams = configs.map((cfg, i) => ({
        id: i + 1,
        title: `全真模拟试卷 ${String.fromCharCode(65 + i)}`,
        listening: cfg.L.map(li => listeningPool[li % listeningPool.length]),
        reading: cfg.R.map(ri => readingPassages[ri % readingPassages.length]),
        task1: writingTask1Pool[cfg.T1 % writingTask1Pool.length],
        task2: writingTask2Pool[cfg.T2 % writingTask2Pool.length],
    }));
    return exams;
}

const allMockExams = build20Exams();

// ===== MOCK EXAM UI ENGINE =====
let currentExam = null;
let examTimer = null;
let examPhase = 'start'; // start, listening, reading, writing, done
let examAnswers = {};
let examPhaseTimeLeft = 0;
let examOverallSeconds = 0;

function initMockExam() {
    const page = document.getElementById('page-mockexam');
    if (!page) return;
    examPhase = 'start';
    if (examTimer) clearInterval(examTimer);
    examTimer = null;
    examAnswers = {};

    page.innerHTML = `
    <div class="page-header"><h1>⏱️ 全真模拟考试</h1><p>20套完整试卷随机轮换 | 每套含听力4节+阅读3篇+写作2篇 | 完整模拟真实考试流程</p></div>
    <div id="examArea"></div>`;
    renderExamStart();
}

function renderExamStart() {
    // Pick a random exam, avoid repeating the last one
    let lastId = parseInt(LS.get('lastExamId', '0'));
    let available = allMockExams.filter(e => e.id !== lastId);
    if (available.length === 0) available = allMockExams;
    currentExam = available[Math.floor(Math.random() * available.length)];
    LS.set('lastExamId', String(currentExam.id));

    const area = document.getElementById('examArea');
    const readingQuestions = currentExam.reading.reduce((sum, r) => sum + r.qs.length, 0);
    const listeningQuestions = currentExam.listening.reduce((sum, s) => sum + s.qs.length, 0);

    area.innerHTML = `
    <div class="card" style="text-align:center;padding:32px;margin-bottom:16px;background:linear-gradient(135deg,#EEF2FF,#E0E7FF)">
        <h2>🏆 ${currentExam.title}</h2>
        <p style="color:var(--t2);margin:8px 0">试卷编号 #${currentExam.id} | 本次随机抽取</p>
        <div class="grid3" style="margin-top:16px">
            <div class="card stat-card"><div style="font-size:2rem">🎧</div><div class="num">30分钟</div><div class="lbl">听力 · 4节 · ${listeningQuestions}题</div></div>
            <div class="card stat-card"><div style="font-size:2rem">📖</div><div class="num">60分钟</div><div class="lbl">阅读 · 3篇 · ${readingQuestions}题</div></div>
            <div class="card stat-card"><div style="font-size:2rem">✍️</div><div class="num">60分钟</div><div class="lbl">写作 · Task1+Task2</div></div>
        </div>
        <p style="color:var(--t2);margin-top:16px;font-size:0.9rem">⏱️ 总时长约2小时30分钟 | 建议按顺序完成：听力→阅读→写作</p>
        <button class="btn btn-p" style="margin-top:16px;font-size:1.1rem;padding:14px 40px" onclick="startFullExam()">▶️ 开始考试</button>
        <button class="btn btn-o" style="margin-left:10px;font-size:1rem;padding:14px 30px" onclick="initMockExam()">🔄 换一套试卷</button>
    </div>
    <div class="card" style="background:linear-gradient(135deg,#FEF3C7,#FFF7ED)"><h3>📋 考试说明</h3>
    <div style="line-height:2;font-size:0.85rem;margin-top:8px">
        <p><strong>1.</strong> 本次考试包含<strong>听力→阅读→写作</strong>三个部分，连续完成</p>
        <p><strong>2.</strong> 听力部分播放录音后答题，每节可重复播放（真实考试只放一遍）</p>
        <p><strong>3.</strong> 阅读部分计时60分钟，答案直接填写，<strong>没有额外誊写时间</strong></p>
        <p><strong>4.</strong> 写作部分请尽量写够字数（Task 1: 150词 / Task 2: 250词）</p>
        <p><strong>5.</strong> 每完成一个部分点击"进入下一部分"，全部完成后查看总分预估</p>
    </div></div>`;
}

function startFullExam() {
    examPhase = 'listening';
    examAnswers = {};
    renderListeningPhase();
    window.scrollTo(0, 0);
}

function renderListeningPhase() {
    const area = document.getElementById('examArea');
    const sections = currentExam.listening;

    let html = `<div class="card" style="margin-bottom:12px;background:linear-gradient(135deg,#DBEAFE,#EFF6FF);border:2px solid #3B82F6">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <h3>🎧 Part 1: 听力理解 (Listening)</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-p" onclick="playAllListening()">▶️ 连续播放全部</button>
            <button class="btn btn-o btn-sm" onclick="speechSynth.cancel()">⏹️ 停止</button>
            <button class="btn btn-s" onclick="finishListeningPhase()">✅ 完成听力，进入阅读 →</button>
        </div>
    </div>
    <p style="color:var(--t2);font-size:0.82rem;margin-top:4px">4个Section | 建议用时30分钟 | 每题单独播放按钮 | 真实考试每段只播放一遍</p></div>`;

    sections.forEach((sec, si) => {
        html += `<div class="card" style="margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;align-items:center">
            <h4>Section ${si + 1}</h4>
            <button class="btn btn-sm btn-o" onclick="playExamSection(${si})">▶️ 播放本节</button>
        </div>`;
        sec.qs.forEach((q, qi) => {
            html += `<div class="quiz-q"><div class="q-text">${qi+1}. ${q.q}</div>
            <input type="text" placeholder="输入答案..." id="examL-${si}-${qi}" style="max-width:300px" onchange="saveExamAnswer('L',${si},${qi})"></div>`;
        });
        html += `</div>`;
    });
    area.innerHTML = html;
    window.scrollTo(0, 0);
}

function playExamSection(si) {
    speechSynth.cancel();
    const sec = currentExam.listening[si];
    const u = new SpeechSynthesisUtterance(sec.script);
    u.lang = 'en-GB'; u.rate = 0.85;
    speechSynth.speak(u);
    showToast('▶️ 播放 Section ' + (si + 1));
}

function playAllListening() {
    let delay = 0;
    currentExam.listening.forEach((sec, si) => {
        setTimeout(() => {
            speechSynth.cancel();
            const u = new SpeechSynthesisUtterance(sec.script);
            u.lang = 'en-GB'; u.rate = 0.85;
            speechSynth.speak(u);
            showToast('▶️ Section ' + (si + 1));
        }, delay);
        delay += sec.script.split(' ').length / 2.2 * 1000 + 4000;
    });
}

function saveExamAnswer(part, si, qi) {
    const el = document.getElementById(`exam${part}-${si}-${qi}`);
    if (el) examAnswers[`${part}-${si}-${qi}`] = el.value.trim();
}

function finishListeningPhase() {
    // Save all listening answers
    currentExam.listening.forEach((sec, si) => {
        sec.qs.forEach((q, qi) => {
            const el = document.getElementById(`examL-${si}-${qi}`);
            if (el) examAnswers[`L-${si}-${qi}`] = el.value.trim();
        });
    });
    examPhase = 'reading';
    renderReadingPhase();
    window.scrollTo(0, 0);
}

function renderReadingPhase() {
    const area = document.getElementById('examArea');
    const passages = currentExam.reading;
    let qNum = 1;

    let html = `<div class="card" style="margin-bottom:12px;background:linear-gradient(135deg,#FEE2E2,#FFF5F5);border:2px solid #EF4444">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <h3>📖 Part 2: 阅读理解 (Reading)</h3>
        <div style="display:flex;gap:8px">
            <button class="btn btn-p" onclick="startExamTimer('reading',60)">⏱️ 开始60分钟计时</button>
            <div class="timer" id="examTimer" style="display:none">⏱️ 剩余: <span id="examTimerDisplay">60:00</span></div>
            <button class="btn btn-s" onclick="finishReadingPhase()">✅ 完成阅读，进入写作 →</button>
        </div>
    </div>
    <p style="color:var(--t2);font-size:0.82rem;margin-top:4px">3篇文章 | 建议用时60分钟 | <strong>没有额外誊写时间!</strong>答案直接填在题目中</p></div>`;

    passages.forEach((p, pi) => {
        html += `<div class="passage-box" style="margin-bottom:10px;max-height:300px;overflow-y:auto">${p.text}</div>
        <h4 style="margin:8px 0 4px">Questions ${qNum}-${qNum + p.qs.length - 1}</h4>`;
        p.qs.forEach((q, qi) => {
            html += `<div class="quiz-q"><div class="q-text">${q.type === 'tf' ? '🔲 判断: ' : '🔘 选择: '}${qNum}. ${q.q}</div><div>`;
            if (q.type === 'tf') {
                html += `<span class="quiz-opt" onclick="examSelectReading(this,'true','${q.ans}',${pi},${qi})">TRUE</span><span class="quiz-opt" onclick="examSelectReading(this,'false','${q.ans}',${pi},${qi})">FALSE</span>`;
            } else {
                q.opts.forEach((o, oi) => html += `<span class="quiz-opt" onclick="examSelectReading(this,'${oi}','${q.ans}',${pi},${qi})">${String.fromCharCode(65 + oi)}. ${o}</span>`);
            }
            html += `</div></div>`;
            qNum++;
        });
    });

    area.innerHTML = html;
    window.scrollTo(0, 0);
}

function examSelectReading(el, val, correct, pi, qi) {
    const parent = el.parentElement;
    parent.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('chosen'));
    el.classList.add('chosen');
    examAnswers[`R-${pi}-${qi}`] = { val, correct };
}

function startExamTimer(phase, minutes) {
    document.getElementById('examTimer').style.display = 'block';
    let total = minutes * 60;
    if (examTimer) clearInterval(examTimer);
    examTimer = setInterval(() => {
        total--;
        const m = Math.floor(total / 60), s = total % 60;
        document.getElementById('examTimerDisplay').textContent = `${m}:${s.toString().padStart(2, '0')}`;
        if (total <= 0) { clearInterval(examTimer); showToast('⏰ 时间到！请尽快完成阅读'); }
    }, 1000);
}

function finishReadingPhase() {
    if (examTimer) clearInterval(examTimer);
    examPhase = 'writing';
    renderWritingPhase();
    window.scrollTo(0, 0);
}

function renderWritingPhase() {
    const area = document.getElementById('examArea');
    const t1 = currentExam.task1;
    const t2 = currentExam.task2;

    area.innerHTML = `
    <div class="card" style="margin-bottom:12px;background:linear-gradient(135deg,#D1FAE5,#ECFDF5);border:2px solid #10B981">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <h3>✍️ Part 3: 写作 (Writing)</h3>
        <div style="display:flex;gap:8px">
            <button class="btn btn-p" onclick="startExamTimer('writing',60)">⏱️ 开始60分钟计时</button>
            <div class="timer" id="examTimer" style="display:none">⏱️ 剩余: <span id="examTimerDisplay">60:00</span></div>
            <button class="btn btn-a" onclick="finishFullExam()">🏁 交卷评分</button>
        </div>
    </div>
    <p style="color:var(--t2);font-size:0.82rem;margin-top:4px">Task 1 (20分钟/150词) + Task 2 (40分钟/250词) | 先写Task 2!</p></div>

    <div class="card" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <h3>📝 Task 1</h3><span class="tag">⏱️ 20分钟 | 📝 至少150词 | ${t1.type}</span>
        </div>
        <div class="writing-prompt" style="background:linear-gradient(135deg,#EEF2FF,#E0E7FF);padding:16px;border-radius:8px;font-size:0.9rem;line-height:1.8"><strong>题目：</strong><br>${t1.prompt}</div>
        <textarea id="examT1" style="width:100%;height:150px;margin-top:10px;padding:12px;border:2px solid var(--b);border-radius:8px;font-size:0.9rem;resize:vertical;font-family:inherit" placeholder="在此写Task 1作文..."></textarea>
    </div>

    <div class="card" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <h3>📝 Task 2</h3><span class="tag">⏱️ 40分钟 | 📝 至少250词 | ${t2.type}</span>
        </div>
        <div class="writing-prompt" style="background:linear-gradient(135deg,#FEF3C7,#FFFBEB);padding:16px;border-radius:8px;font-size:0.9rem;line-height:1.8"><strong>题目：</strong><br>${t2.prompt}</div>
        <textarea id="examT2" style="width:100%;height:250px;margin-top:10px;padding:12px;border:2px solid var(--b);border-radius:8px;font-size:0.9rem;resize:vertical;font-family:inherit" placeholder="在此写Task 2作文..."></textarea>
    </div>`;
    window.scrollTo(0, 0);
}

function finishFullExam() {
    if (examTimer) clearInterval(examTimer);
    examPhase = 'done';

    // Score listening
    let listeningScore = 0, listeningTotal = 0;
    currentExam.listening.forEach((sec, si) => {
        sec.qs.forEach((q, qi) => {
            listeningTotal++;
            const userAns = (examAnswers[`L-${si}-${qi}`] || '').toLowerCase().trim();
            if (userAns === q.ans.toLowerCase().trim()) listeningScore++;
        });
    });

    // Score reading
    let readingScore = 0, readingTotal = 0;
    Object.entries(examAnswers).forEach(([key, val]) => {
        if (key.startsWith('R-') && typeof val === 'object') {
            readingTotal++;
            if (val.val === val.correct) readingScore++;
        }
    });

    // Count words in writing
    const t1Text = (document.getElementById('examT1')?.value || '').trim();
    const t2Text = (document.getElementById('examT2')?.value || '').trim();
    const t1Words = t1Text ? t1Text.split(/\s+/).length : 0;
    const t2Words = t2Text ? t2Text.split(/\s+/).length : 0;

    // Band score estimator
    const scoreToBand = (score, total) => {
        if (total === 0) return 'N/A';
        const pct = score / total;
        if (pct >= 0.975) return '9.0'; if (pct >= 0.925) return '8.5'; if (pct >= 0.875) return '8.0';
        if (pct >= 0.8) return '7.5'; if (pct >= 0.75) return '7.0'; if (pct >= 0.675) return '6.5';
        if (pct >= 0.575) return '6.0'; if (pct >= 0.5) return '5.5'; if (pct >= 0.4) return '5.0';
        if (pct >= 0.325) return '4.5'; return '4.0以下';
    };

    const lBand = scoreToBand(listeningScore, listeningTotal);
    const rBand = scoreToBand(readingScore, readingTotal);

    const area = document.getElementById('examArea');
    area.innerHTML = `
    <div class="card" style="text-align:center;padding:32px;margin-bottom:16px;background:linear-gradient(135deg,#D1FAE5,#ECFDF5)">
        <h2>🏁 考试结束！</h2><p style="color:var(--t2)">${currentExam.title} #${currentExam.id}</p>
        <div class="grid4" style="margin-top:16px;">
            <div class="card stat-card"><div class="num">${lBand}</div><div class="lbl">听力 预估分<br>${listeningScore}/${listeningTotal}正确</div></div>
            <div class="card stat-card"><div class="num">${rBand}</div><div class="lbl">阅读 预估分<br>${readingScore}/${readingTotal}正确</div></div>
            <div class="card stat-card"><div class="num">${t1Words}</div><div class="lbl">Task 1 词数<br>${t1Words >= 150 ? '✅ 达标' : '⚠️ 不足150词'}</div></div>
            <div class="card stat-card"><div class="num">${t2Words}</div><div class="lbl">Task 2 词数<br>${t2Words >= 250 ? '✅ 达标' : '⚠️ 不足250词'}</div></div>
        </div>
        <p style="color:var(--t2);margin-top:12px;font-size:0.85rem">⚠️ 写作分数需人工批改，以上仅为听力+阅读自动评分</p>
        <div style="margin-top:16px;display:flex;gap:10px;justify-content:center">
            <button class="btn btn-p" onclick="initMockExam()">🔄 再做一套</button>
            <button class="btn btn-o" onclick="reviewExamAnswers()">📋 查看答案解析</button>
        </div>
    </div>
    <div id="examReviewArea"></div>`;
    window.scrollTo(0, 0);
}

function reviewExamAnswers() {
    let html = '<div class="card"><h3>📋 答案解析</h3>';
    // Listening answers
    html += '<h4 style="margin-top:12px">🎧 听力答案</h4>';
    currentExam.listening.forEach((sec, si) => {
        html += `<p style="font-weight:600;margin-top:8px">Section ${si + 1}</p>`;
        sec.qs.forEach((q, qi) => {
            const userAns = (examAnswers[`L-${si}-${qi}`] || '').toLowerCase().trim();
            const correct = q.ans.toLowerCase().trim();
            const icon = userAns === correct ? '✅' : '❌';
            html += `<p style="font-size:0.85rem">${icon} Q${qi+1}: 你的答案"${userAns||'(空)'}" | 正确答案"${q.ans}"</p>`;
        });
    });
    // Reading answers
    html += '<h4 style="margin-top:12px">📖 阅读答案</h4>';
    let rIdx = 0;
    currentExam.reading.forEach((p, pi) => {
        html += `<p style="font-weight:600;margin-top:8px">Passage ${pi + 1}</p>`;
        p.qs.forEach((q, qi) => {
            const key = `R-${pi}-${qi}`;
            const a = examAnswers[key];
            const icon = a && a.val === a.correct ? '✅' : '❌';
            const userDisplay = a ? (a.val === 'true' ? 'TRUE' : a.val === 'false' ? 'FALSE' : a.val) : '(未答)';
            const correctDisplay = q.type === 'tf' ? (q.ans === 'true' ? 'TRUE' : 'FALSE') : q.opts[parseInt(q.ans)];
            html += `<p style="font-size:0.85rem">${icon} Q${rIdx+1}: 你的答案"${userDisplay}" | 正确答案"${correctDisplay}"</p>`;
            rIdx++;
        });
    });
    html += '</div>';
    document.getElementById('examReviewArea').innerHTML = html;
}
