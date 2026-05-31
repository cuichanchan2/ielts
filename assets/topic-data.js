// ============ TOPIC HUB DATA - 14 IELTS Topics ============
// Each topic: vocabulary subset + speaking questions + writing prompts + reading tips
// Used by the topic hub page when clicking knowledge graph balls

var TOPIC_DATA = {

education: {
    label:'教育', icon:'🎓',
    description:'雅思高频话题。听力Section3常出现师生对话、课程咨询；阅读P2/P3常见教育改革、学术研究类文章；写作Task2高频（教育目的、在线学习、大学学费）；口语Part1/3常问学习经历。',
    vocab: [
        ["curriculum","课程","n.","education","basic","/kəˈrɪkjələm/","The school updated its curriculum last year."],
        ["scholarship","奖学金","n.","education","intermediate","/ˈskɒləʃɪp/","She won a scholarship to study abroad."],
        ["dissertation","学位论文","n.","education","advanced","/ˌdɪsəˈteɪʃn/","He is writing his dissertation on climate policy."],
        ["tuition","学费","n.","education","intermediate","/tjuˈɪʃn/","Tuition fees have risen sharply."],
        ["vocational","职业的","adj.","education","advanced","/vəʊˈkeɪʃənl/","Vocational training prepares students for jobs."],
        ["literacy","读写能力","n.","education","intermediate","/ˈlɪtərəsi/","Improving adult literacy is a priority."],
        ["compulsory","强制性的","adj.","education","intermediate","/kəmˈpʌlsəri/","Education is compulsory until age 16."],
        ["pedagogy","教学法","n.","education","advanced","/ˈpedəɡɒdʒi/","Modern pedagogy emphasizes active learning."],
        ["undergraduate","本科生","n.","education","basic","/ˌʌndəˈɡrædʒuət/","She is an undergraduate at Oxford."],
        ["postgraduate","研究生","n.","education","intermediate","/ˌpəʊstˈɡrædʒuət/","Postgraduate studies require more independence."],
        ["thesis","论文；论点","n.","education","advanced","/ˈθiːsɪs/","His thesis argues that technology improves learning."],
        ["mentor","导师","n.","education","intermediate","/ˈmentɔːr/","A good mentor provides guidance and support."],
        ["syllabus","教学大纲","n.","education","intermediate","/ˈsɪləbəs/","The syllabus outlines all assignments."],
        ["semester","学期","n.","education","basic","/sɪˈmestər/","The new semester starts in September."],
        ["enrollment","入学；注册","n.","education","intermediate","/ɪnˈrəʊlmənt/","Enrollment has increased by 15%."]
    ],
    speaking: [
        {q:'What was your favorite subject in school?',a:'My favorite subject was history because I enjoyed learning about how past events shape the present. The teacher made lessons engaging by telling stories rather than just listing facts. I think understanding history helps us avoid repeating mistakes and gives perspective on current issues.'},
        {q:'Do you think education should be free for everyone?',a:'I believe education should be free at least up to the secondary level, as it is a fundamental right. For higher education, I think a mixed model works best—government subsidies combined with modest tuition, with scholarships for students from disadvantaged backgrounds. Education benefits society as a whole, so public investment in it is justified.'}
    ],
    writing: [
        {q:'Some people believe that university education should be free for everyone. To what extent do you agree or disagree?',tips:'论点1：免费教育促进社会公平。论点2：政府财政压力。结论：基础免费+高等教育补助方案。'},
        {q:'Online learning is becoming increasingly popular. Do the advantages outweigh the disadvantages?',tips:'优点：灵活性、可及性、成本低。缺点：缺少社交互动、自律要求高。结论：混合模式最佳。'}
    ],
    readingTip:'教育类阅读文章常见于P2(科普说明文)和P3(学术议论文)。关键词：reform, funding, literacy, curriculum, assessment。注意区分作者观点(vs.引用的研究观点)。'
},

environment: {
    label:'环境', icon:'🌍',
    description:'雅思全科高频话题。听力Section4常为环境讲座；阅读P1/P2常见气候变化文章；写作Task1图表常涉及排放数据/能源消费，Task2高频(环境保护vs.经济发展)；口语Part3常讨论个人环保行动。',
    vocab: [
        ["biodiversity","生物多样性","n.","environment","advanced","/ˌbaɪəʊdaɪˈvɜːsəti/","Rainforests host incredible biodiversity."],
        ["deforestation","砍伐森林","n.","environment","intermediate","/diːˌfɒrɪˈsteɪʃn/","Deforestation contributes to climate change."],
        ["ecosystem","生态系统","n.","environment","intermediate","/ˈiːkəʊsɪstəm/","Coral reef ecosystems are under threat."],
        ["emission","排放","n.","environment","intermediate","/ɪˈmɪʃn/","Carbon emissions must be reduced."],
        ["sustainable","可持续的","adj.","environment","intermediate","/səˈsteɪnəbl/","Sustainable development is essential."],
        ["renewable","可再生的","adj.","environment","intermediate","/rɪˈnjuːəbl/","Solar is a renewable energy source."],
        ["conservation","保护","n.","environment","intermediate","/ˌkɒnsəˈveɪʃn/","Wildlife conservation needs funding."],
        ["fossil fuel","化石燃料","n.","environment","basic","/ˈfɒsl fjuːəl/","Burning fossil fuels releases CO2."],
        ["carbon footprint","碳足迹","n.","environment","advanced","","We can reduce our carbon footprint."],
        ["endangered","濒危的","adj.","environment","intermediate","/ɪnˈdeɪndʒəd/","Pandas are an endangered species."],
        ["pollutant","污染物","n.","environment","advanced","/pəˈluːtnt/","Industrial pollutants contaminate water."],
        ["drought","干旱","n.","environment","intermediate","/draʊt/","The region suffered a severe drought."],
        ["glacier","冰川","n.","environment","advanced","/ˈɡlæsiər/","Glaciers are melting at alarming rates."],
        ["irrigation","灌溉","n.","environment","intermediate","/ˌɪrɪˈɡeɪʃn/","Efficient irrigation saves water."],
        ["landfill","垃圾填埋场","n.","environment","intermediate","/ˈlændfɪl/","Reducing landfill waste is crucial."]
    ],
    speaking: [
        {q:'What do you do to help the environment?',a:'I try to reduce my environmental impact in small ways. I carry reusable bags when shopping, avoid single-use plastics, and use public transport instead of driving when possible. At home, I separate recyclables from general waste. I know these are small actions, but if everyone does their part, the collective impact is significant.'},
        {q:'Do you think individuals can make a difference to the environment?',a:'Individual actions alone cannot solve environmental problems, but they are still important. They create a culture of environmental awareness and put pressure on companies and governments to act. However, systemic change—stricter regulations, carbon pricing, investment in green technology—is essential. Individual and systemic action should go hand in hand.'}
    ],
    writing: [
        {q:'The amount of plastic waste in the environment is increasing rapidly. What problems does this cause and what measures can be taken?',tips:'问题：海洋生物死亡、微塑料进入食物链、旅游业损失。措施：禁塑令、企业责任延伸、可降解材料研发、公众教育。'},
        {q:'Some people believe that economic growth is more important than protecting the environment. Discuss both views.',tips:'经济增长论点：就业、脱贫、基础设施。环保论点：长期可持续、健康成本、生态系统服务价值。结论：绿色增长(green growth)平衡双方。'}
    ],
    readingTip:'环境类文章常见数据描述(percentage, increase, decline)和因果分析。重点词汇：contribute to, result in, lead to, give rise to。注意区分fact(数据)和prediction(预测)。'
},

health: {
    label:'健康', icon:'🏥',
    description:'听力Section1常为看病预约场景；阅读P1/P2常见健康研究报道；写作Task2常见(饮食/运动/医疗资源分配)；口语Part1常问生活习惯。',
    vocab: [
        ["obesity","肥胖","n.","health","basic","/əʊˈbiːsəti/","Childhood obesity is a growing concern."],
        ["chronic","慢性的","adj.","health","intermediate","/ˈkrɒnɪk/","Chronic stress affects physical health."],
        ["diagnosis","诊断","n.","health","intermediate","/ˌdaɪəɡˈnəʊsɪs/","Early diagnosis improves survival rates."],
        ["nutrition","营养","n.","health","intermediate","/njuˈtrɪʃn/","Good nutrition is essential for children."],
        ["sedentary","久坐的","adj.","health","intermediate","/ˈsedntəri/","A sedentary lifestyle increases health risks."],
        ["vaccine","疫苗","n.","health","intermediate","/ˈvæksiːn/","Vaccines have saved millions of lives."],
        ["epidemic","流行病","n.","health","intermediate","/ˌepɪˈdemɪk/","The obesity epidemic is a global issue."],
        ["symptom","症状","n.","health","basic","/ˈsɪmptəm/","Common symptoms include fever and cough."],
        ["therapy","治疗","n.","health","intermediate","/ˈθerəpi/","Physical therapy helped her recover."],
        ["prescription","处方","n.","health","intermediate","/prɪˈskrɪpʃn/","This medicine requires a prescription."],
        ["immunity","免疫力","n.","health","advanced","/ɪˈmjuːnəti/","Breastfeeding helps build immunity."],
        ["rehabilitation","康复","n.","health","intermediate","/ˌriːəˌbɪlɪˈteɪʃn/","Rehabilitation took several months."],
        ["addiction","上瘾","n.","health","intermediate","/əˈdɪkʃn/","Smartphone addiction affects sleep."],
        ["well-being","幸福；健康","n.","health","intermediate","","Exercise improves mental well-being."],
        ["psychological","心理的","adj.","health","intermediate","/ˌsaɪkəˈlɒdʒɪkl/","Psychological factors affect recovery."]
    ],
    speaking: [
        {q:'What do you do to stay healthy?',a:'I try to maintain a balanced lifestyle. I exercise three to four times a week—usually jogging or swimming. I also pay attention to my diet, eating plenty of vegetables and avoiding processed foods. Sleep is equally important; I aim for seven to eight hours each night. Mental health matters too, so I make time for hobbies and relaxation.'},
        {q:'Do you think the government should do more to promote healthy lifestyles?',a:'Yes, I think governments have a responsibility to promote public health. They can run awareness campaigns about nutrition and exercise, regulate junk food advertising, and invest in public sports facilities. However, they need to balance this with personal freedom—people should ultimately make their own choices, but with access to accurate information and healthy options.'}
    ],
    writing: [
        {q:'Many people today are overweight. What are the causes of this and what can be done?',tips:'原因：快餐文化、久坐工作方式、食品工业营销。措施：糖税、营养标签、学校体育、城市规划(步行/骑行)。'},
        {q:'Should governments tax unhealthy food? Discuss both views.',tips:'支持：减少消费=改善健康+降低医疗支出。反对：侵犯个人自由、对低收入人群不公平。结论：税收+教育+健康食品补贴组合方案。'}
    ],
    readingTip:'健康类文章多用研究数据支撑(studies show, research indicates, according to a survey)。注意区分correlation(相关)和causation(因果)。常见题型：Heading匹配、判断题。'
},

technology: {
    label:'科技', icon:'💻',
    description:'听力Section4常为科技发展趋势讲座；阅读P1/P3常见AI/互联网影响文章；写作Task2高频(AI/社交媒体/屏幕时间)；口语Part3常讨论科技对社会的影响。',
    vocab: [
        ["artificial intelligence","人工智能","n.","technology","intermediate","","AI is transforming industries."],
        ["automation","自动化","n.","technology","advanced","/ˌɔːtəˈmeɪʃn/","Automation may replace routine jobs."],
        ["innovation","创新","n.","technology","intermediate","/ˌɪnəˈveɪʃn/","Innovation drives economic growth."],
        ["digital","数字的","adj.","technology","basic","/ˈdɪdʒɪtl/","The digital revolution changes everything."],
        ["cybersecurity","网络安全","n.","technology","advanced","","Companies invest in cybersecurity."],
        ["algorithm","算法","n.","technology","advanced","/ˈælɡərɪðəm/","Algorithms influence what we see online."],
        ["bandwidth","带宽","n.","technology","intermediate","/ˈbændwɪdθ/","Video calls require high bandwidth."],
        ["encrypt","加密","v.","technology","advanced","/ɪnˈkrɪpt/","Data is encrypted for security."],
        ["interface","界面；接口","n.","technology","intermediate","/ˈɪntəfeɪs/","The interface is user-friendly."],
        ["virtual reality","虚拟现实","n.","technology","intermediate","","VR creates immersive experiences."],
        ["software","软件","n.","technology","basic","/ˈsɒftweər/","The software updates automatically."],
        ["hardware","硬件","n.","technology","basic","/ˈhɑːdweər/","Hardware improves every year."],
        ["robotics","机器人学","n.","technology","advanced","/rəʊˈbɒtɪks/","Robotics is advancing rapidly."],
        ["biotechnology","生物技术","n.","technology","advanced","/ˌbaɪəʊtekˈnɒlədʒi/","Biotechnology offers medical breakthroughs."],
        ["data","数据","n.","technology","basic","/ˈdeɪtə/","Companies collect vast amounts of data."]
    ],
    speaking: [
        {q:'What piece of technology do you find most useful?',a:'My smartphone is probably the most useful. It serves as a communication device, camera, map, calendar, and entertainment center all in one. I use it daily for navigation, messaging, and accessing information. However, I try to be mindful of screen time and not let it dominate my life.'},
        {q:'Do you think technology makes people less social?',a:'It is a double-edged sword. Technology can reduce face-to-face interaction when people spend too much time on their devices even when physically together. But it also enables social connections that would otherwise be impossible—video calls with distant family, online communities around shared interests. The key is using technology intentionally rather than passively.'}
    ],
    writing: [
        {q:'Artificial intelligence will eventually replace most human jobs. Do you agree or disagree?',tips:'同意：制造业/客服/数据处理已自动化。不同意：创意/情感/复杂决策需要人类。结论：AI改变工作而非消灭工作→人机协作。'},
        {q:'Children spend too much time on electronic devices. What are the causes and effects?',tips:'原因：家长忙碌、数字娱乐吸引力、教育数字化。影响：视力下降、注意力分散、社交技能减弱。建议：设定屏幕时间、户外活动、家长示范。'}
    ],
    readingTip:'科技文章常见专业术语解释(embedded in text)。注意：新技术名旁边常有同位语解释。题型：段落信息匹配、句子完成。时间线索：past→present→future predictions。'
},

society: {
    label:'社会', icon:'👥',
    description:'写作Task2极高频(城市化/老龄化/移民/社会公平)；阅读P3常见社会问题议论文；口语Part3常讨论社会变迁；听力Section4可能涉及人口统计讲座。',
    vocab: [
        ["demographic","人口统计的","adj.","society","intermediate","/ˌdeməˈɡræfɪk/","Demographic changes affect the economy."],
        ["inequality","不平等","n.","society","intermediate","/ˌɪnɪˈkwɒləti/","Income inequality has widened."],
        ["urbanization","城市化","n.","society","intermediate","/ˌɜːbənaɪˈzeɪʃn/","Urbanization creates both opportunities and challenges."],
        ["immigration","移民","n.","society","intermediate","/ˌɪmɪˈɡreɪʃn/","Immigration enriches cultural diversity."],
        ["globalization","全球化","n.","society","intermediate","/ˌɡləʊbəlaɪˈzeɪʃn/","Globalization connects economies worldwide."],
        ["infrastructure","基础设施","n.","society","intermediate","/ˈɪnfrəstrʌktʃər/","Infrastructure needs significant investment."],
        ["welfare","福利","n.","society","intermediate","/ˈwelfeər/","Social welfare supports vulnerable groups."],
        ["discrimination","歧视","n.","society","intermediate","/dɪˌskrɪmɪˈneɪʃn/","Laws prohibit workplace discrimination."],
        ["democracy","民主","n.","society","basic","/dɪˈmɒkrəsi/","Democracy requires informed citizens."],
        ["minority","少数群体","n.","society","intermediate","/maɪˈnɒrəti/","Minority rights must be protected."],
        ["bureaucracy","官僚机构","n.","society","advanced","/bjʊəˈrɒkrəsi/","Reducing bureaucracy improves efficiency."],
        ["coalition","联盟","n.","society","intermediate","/ˌkəʊəˈlɪʃn/","A coalition government was formed."],
        ["consensus","共识","n.","society","intermediate","/kənˈsensəs/","Reaching consensus takes time."],
        ["marginalize","边缘化","v.","society","advanced","/ˈmɑːdʒɪnəlaɪz/","Some groups are marginalized in society."],
        ["humanitarian","人道主义的","adj.","society","intermediate","/hjuːˌmænɪˈteəriən/","Humanitarian aid was sent to the region."]
    ],
    speaking: [
        {q:'Has your hometown changed much in recent years?',a:'Yes, it has changed quite dramatically. Many old buildings have been replaced by modern apartment complexes. The population has grown significantly, with more young people moving here for work. New shopping malls and restaurants have opened. While I appreciate the convenience, I sometimes miss the quieter, more traditional atmosphere of the past.'},
        {q:'What are the benefits of living in a multicultural society?',a:'Living in a multicultural society broadens your perspective tremendously. You are exposed to different foods, festivals, languages, and ways of thinking. This exposure fosters tolerance and helps break down stereotypes. On a practical level, diversity drives innovation—people from different backgrounds bring different approaches to problem-solving, which benefits business and society as a whole.'}
    ],
    writing: [
        {q:'In many countries, the population is aging. What problems does this cause and what can be done?',tips:'问题：养老金负担、医疗需求增加、劳动力短缺。措施：延迟退休、鼓励生育、移民政策、自动化技术。'},
        {q:'More and more people are moving to cities. Is this a positive or negative development?',tips:'正面：经济机会、文化设施、效率。负面：拥堵、污染、住房成本。结论：需要更好的城市规划(smart cities, green belts)。'}
    ],
    readingTip:'社会类文章常比较发达国家vs.发展中国家的不同趋势。注意contrast信号词：however, whereas, in contrast, while。题型：List of Headings, Matching。'
},

work: {
    label:'工作', icon:'💼',
    description:'听力Section1常为求职/面试场景；阅读P1常见职场趋势短文；写作Task2中频(工作满意度/远程办公/工作生活平衡)；口语Part2常考理想职业。',
    vocab: [
        ["colleague","同事","n.","work","basic","/ˈkɒliːɡ/","I discussed it with my colleagues."],
        ["promotion","晋升","n.","work","basic","/prəˈməʊʃn/","She earned a promotion."],
        ["recruitment","招聘","n.","work","intermediate","/rɪˈkruːtmənt/","The recruitment process is rigorous."],
        ["internship","实习","n.","work","basic","/ˈɪntɜːnʃɪp/","The internship provided valuable experience."],
        ["freelance","自由职业","adj.","work","basic","/ˈfriːlɑːns/","She works as a freelance designer."],
        ["workforce","劳动力","n.","work","intermediate","/ˈwɜːkfɔːs/","Women make up 40% of the workforce."],
        ["redundancy","裁员","n.","work","advanced","/rɪˈdʌndənsi/","The company announced redundancies."],
        ["outsource","外包","v.","work","intermediate","/ˈaʊtsɔːs/","Many firms outsource IT services."],
        ["morale","士气","n.","work","advanced","/məˈrɑːl/","Team morale affects productivity."],
        ["incentive","激励","n.","work","intermediate","/ɪnˈsentɪv/","Financial incentives motivate staff."],
        ["stakeholder","利益相关者","n.","work","advanced","/ˈsteɪkhəʊldər/","All stakeholders were consulted."],
        ["benchmark","基准","n.","work","advanced","/ˈbentʃmɑːk/","We set benchmarks for performance."],
        ["commute","通勤","v./n.","work","intermediate","/kəˈmjuːt/","My commute takes about 40 minutes."],
        ["apprentice","学徒","n.","work","intermediate","/əˈprentɪs/","He started as an apprentice chef."],
        ["turnover","人员流动","n.","work","intermediate","/ˈtɜːnəʊvər/","High staff turnover is costly."]
    ],
    speaking: [
        {q:'What kind of job would you like to do in the future?',a:'I would like to work in a field that combines creativity with problem-solving, possibly in technology or design. A collaborative work environment is important to me—I thrive when I can exchange ideas with colleagues. Work-life balance is also a priority; I want a career that is fulfilling but does not consume my entire life.'},
        {q:'Is it important to have a high salary?',a:'Salary is important because it provides financial security and freedom of choice. However, research shows that beyond a certain level, more money does not significantly increase happiness. Factors like job satisfaction, work-life balance, relationships with colleagues, and a sense of purpose are equally important if not more so for long-term fulfilment.'}
    ],
    writing: [
        {q:'Some people think job satisfaction is more important than a high salary. Do you agree?',tips:'同意：满足感>金钱、长期幸福、降低倦怠。反对：金钱保障基本需求。结论：理想是两者平衡，但满足感长期更重要。'},
        {q:'Remote working is becoming more common. Is this a positive or negative development?',tips:'正面：减少通勤、灵活性、降低成本。负面：孤立感、工作与生活边界模糊、团队协作挑战。结论：混合模式最佳。'}
    ],
    readingTip:'职场类文章多为P1难度(描述+说明)，题型常见填空+判断题。时间线索：past vs. current trends vs. future predictions是常见结构。注意数据描述词：account for, make up, constitute。'
},

culture: {
    label:'文化', icon:'🎨',
    description:'口语Part2常考(描述节日/艺术品/传统)；写作Task2中频(文化保护/全球化对文化的影响)；阅读P1/P2常见文化类说明文；听力Section2可能涉及博物馆/展览介绍。',
    vocab: [
        ["heritage","遗产","n.","culture","intermediate","/ˈherɪtɪdʒ/","Cultural heritage should be preserved."],
        ["festival","节日","n.","culture","basic","/ˈfestɪvl/","The Spring Festival is widely celebrated."],
        ["architecture","建筑","n.","culture","intermediate","/ˈɑːkɪtektʃər/","The city has stunning architecture."],
        ["exhibition","展览","n.","culture","intermediate","/ˌeksɪˈbɪʃn/","The exhibition drew large crowds."],
        ["sculpture","雕塑","n.","culture","intermediate","/ˈskʌlptʃər/","A bronze sculpture stands in the square."],
        ["orchestra","管弦乐队","n.","culture","basic","/ˈɔːkɪstrə/","The orchestra performed beautifully."],
        ["genre","体裁","n.","culture","intermediate","/ˈʒɒnrə/","This genre originated in the 19th century."],
        ["ritual","仪式","n.","culture","advanced","/ˈrɪtʃuəl/","Traditional rituals are passed down generations."],
        ["masterpiece","杰作","n.","culture","advanced","/ˈmɑːstəpiːs/","It is considered his masterpiece."],
        ["renaissance","复兴","n.","culture","intermediate","/rɪˈneɪsns/","The Renaissance transformed European art."],
        ["indigenous","本土的","adj.","culture","intermediate","/ɪnˈdɪdʒɪnəs/","Indigenous cultures face many threats."],
        ["artifact","文物","n.","culture","basic","/ˈɑːtɪfækt/","Ancient artifacts were discovered."],
        ["calligraphy","书法","n.","culture","intermediate","/kəˈlɪɡrəfi/","Chinese calligraphy is an art form."],
        ["symphony","交响乐","n.","culture","intermediate","/ˈsɪmfəni/","Beethoven's Fifth Symphony is iconic."],
        ["portrait","肖像","n.","culture","intermediate","/ˈpɔːtrɪt/","The museum displayed royal portraits."]
    ],
    speaking: [
        {q:'What traditional festivals are important in your country?',a:'The Spring Festival, or Chinese New Year, is the most important. Families gather for reunion dinners, children receive red envelopes, and there are fireworks and lion dances. The Mid-Autumn Festival is also significant—people eat mooncakes and appreciate the full moon together. These festivals strengthen family bonds and preserve cultural traditions.'},
        {q:'Do you think museums are important?',a:'Absolutely. Museums preserve history and make it accessible. They educate the public, inspire creativity, and provide a tangible connection to the past. In the digital age, museums are evolving—many now offer virtual tours and interactive exhibits. However, seeing artifacts in person remains a uniquely powerful experience that cannot be replicated online.'}
    ],
    writing: [
        {q:'Some people think that traditional cultures will be lost as globalization increases. Do you agree?',tips:'同意：文化同质化、年轻人兴趣转移。不同意：全球化也可以传播和保护文化(UNESCO、文化节)。结论：主动保护+合理利用全球化平台。'},
        {q:'Should governments spend money on supporting the arts? Discuss.',tips:'支持：文化认同、旅游业、教育价值、创意经济。反对：有限预算应优先医疗/教育。结论：适度但持续的文化投入是必要的。'}
    ],
    readingTip:'文化类文章常包含历史背景描述(past tenses)和当前状态(present tenses)的混合。注意时间状语和比较结构。常见专有名词和地名需要快速识别。'
},

travel: {
    label:'旅行', icon:'✈️',
    description:'听力Section1极高频(酒店预订/旅游咨询/行程安排)；口语Part1/2常考(旅行经历/想去的地方)；阅读P1常见旅游类说明文；写作Task2低频但可能出现(旅游业影响)。',
    vocab: [
        ["itinerary","行程","n.","travel","basic","/aɪˈtɪnərəri/","Our itinerary includes three cities."],
        ["accommodation","住宿","n.","travel","basic","/əˌkɒməˈdeɪʃn/","We booked accommodation in advance."],
        ["destination","目的地","n.","travel","basic","/ˌdestɪˈneɪʃn/","Thailand is a popular destination."],
        ["sightseeing","观光","n.","travel","basic","/ˈsaɪtsiːɪŋ/","We spent the day sightseeing."],
        ["expedition","探险","n.","travel","intermediate","/ˌekspɪˈdɪʃn/","The expedition reached the summit."],
        ["jetlag","时差","n.","travel","intermediate","/ˈdʒetlæɡ/","I suffered from severe jetlag."],
        ["backpacker","背包客","n.","travel","intermediate","/ˈbækpækər/","Backpackers travel on a budget."],
        ["embassy","大使馆","n.","travel","intermediate","/ˈembəsi/","Contact the embassy in an emergency."],
        ["visa","签证","n.","travel","basic","/ˈviːzə/","You need a visa to enter the country."],
        ["customs","海关","n.","travel","intermediate","/ˈkʌstəmz/","We passed through customs quickly."],
        ["excursion","短途旅行","n.","travel","intermediate","/ɪkˈskɜːʃn/","We took an excursion to the islands."],
        ["domestic","国内的","adj.","travel","basic","/dəˈmestɪk/","Domestic tourism is recovering."],
        ["hospitality","款待；好客","n.","travel","intermediate","/ˌhɒspɪˈtæləti/","The local hospitality was wonderful."],
        ["duty-free","免税的","adj.","travel","intermediate","","Duty-free shopping is available."],
        ["all-inclusive","全包的","adj.","travel","intermediate","","We chose an all-inclusive resort."]
    ],
    speaking: [
        {q:'Do you enjoy traveling?',a:'I love traveling. It is one of my biggest passions. I enjoy experiencing different cultures, trying local foods, and seeing famous landmarks in person rather than in photos. Traveling broadens your perspective and makes you more adaptable. My most memorable trip was to Yunnan province, where the scenery was breathtaking.'},
        {q:'Where would you like to travel in the future?',a:'I dream of visiting Iceland to see the Northern Lights and the dramatic volcanic landscapes. I am also fascinated by Japan—the blend of ancient traditions and cutting-edge technology is unique. Closer to home, there are still many places in China I have not explored, like Xinjiang and Tibet.'}
    ],
    writing: [
        {q:'International tourism has brought enormous benefits to many places, but also creates problems. Do the problems outweigh the benefits?',tips:'好处：经济收入、就业、文化交流、基础设施改善。问题：过度旅游(overtourism)、环境破坏、文化商品化。结论：可持续旅游(sustainable tourism)是解决之道。'},
        {q:'Some people prefer to travel alone, others prefer to travel with companions. Discuss.',tips:'独自旅行：自由、自我发现、更深入当地体验。结伴旅行：安全、分享、成本分担。结论：取决于个人偏好和目的地。'}
    ],
    readingTip:'旅游文章常见于P1难度。题型：填空(预订信息)、表格匹配。关键词：dates, prices, locations, amenities。注意数字和专有名词的拼写。'
},

crime: {
    label:'犯罪', icon:'⚖️',
    description:'阅读P2/P3偶尔出现犯罪学/法律文章；写作Task2低频但经典(刑罚/青少年犯罪/监控)；口语Part3可能涉及(法律/安全)。词汇偏学术，但很多是阅读高频词。',
    vocab: [
        ["verdict","裁决","n.","crime","intermediate","/ˈvɜːdɪkt/","The jury returned a guilty verdict."],
        ["defendant","被告","n.","crime","intermediate","/dɪˈfendənt/","The defendant pleaded not guilty."],
        ["prosecutor","检察官","n.","crime","advanced","/ˈprɒsɪkjuːtər/","The prosecutor presented evidence."],
        ["sentence","判刑","n./v.","crime","intermediate","/ˈsentəns/","He received a five-year sentence."],
        ["deterrent","威慑","n.","crime","advanced","/dɪˈterənt/","Harsh punishment acts as a deterrent."],
        ["rehabilitate","改造","v.","crime","advanced","/ˌriːəˈbɪlɪteɪt/","Prisons should aim to rehabilitate."],
        ["offender","罪犯","n.","crime","intermediate","/əˈfendər/","First-time offenders may get lighter sentences."],
        ["legislation","立法","n.","crime","intermediate","/ˌledʒɪsˈleɪʃn/","New legislation tackles cybercrime."],
        ["fraud","诈骗","n.","crime","basic","/frɔːd/","Credit card fraud is increasing."],
        ["testimony","证词","n.","crime","intermediate","/ˈtestɪməni/","Her testimony was crucial to the case."],
        ["conviction","定罪","n.","crime","intermediate","/kənˈvɪkʃn/","The conviction was later overturned."],
        ["burglary","入室盗窃","n.","crime","intermediate","/ˈbɜːɡləri/","Burglary rates have decreased."],
        ["vandalism","破坏公物","n.","crime","intermediate","/ˈvændəlɪzəm/","Vandalism costs the community money."],
        ["surveillance","监控","n.","crime","intermediate","/sɜːˈveɪləns/","CCTV surveillance deters crime."],
        ["penalty","处罚","n.","crime","intermediate","/ˈpenəlti/","The penalty includes a heavy fine."]
    ],
    speaking: [
        {q:'Is your neighborhood safe?',a:'Yes, my neighborhood is generally very safe. There is good street lighting, and neighbors look out for each other. I feel comfortable walking home at night. That said, I still take basic precautions like locking doors and not leaving valuables visible.'},
        {q:'Do you think having cameras in public places is a good idea?',a:'I have mixed feelings. Security cameras can deter crime and help solve cases when crimes do occur. However, widespread surveillance raises privacy concerns. There needs to be a balance—cameras in high-risk areas like transport hubs are justified, but constant monitoring of every public space feels excessive.'}
    ],
    writing: [
        {q:'Some people believe that the best way to reduce crime is to give longer prison sentences. Others think there are better ways. Discuss.',tips:'更长期刑：威慑、隔离罪犯。更好的方法：教育、就业机会、社区改造、解决贫困根源。结论：综合方案(刑罚+预防+改造)最有效。'},
        {q:'Why do some young people commit crimes, and what can be done to prevent this?',tips:'原因：贫困、缺乏教育、同伴压力、家庭问题。预防：青年中心、导师计划、技能培训、早期干预。'}
    ],
    readingTip:'犯罪/法律文章词汇偏正式(verdict, testimony, legislation, detention)。注意区分argument(论点)和evidence(证据)。题型：判断题(Y/N/NG)、段落匹配。'
},

economy: {
    label:'经济', icon:'💰',
    description:'写作Task1图表作文极高频(经济数据/贸易/消费)；阅读P1/P2常见经济类说明文；听力Section4可能是经济讲座；口语Part3偶尔涉及(消费/广告)。',
    vocab: [
        ["inflation","通货膨胀","n.","economy","basic","/ɪnˈfleɪʃn/","Inflation has risen to 5%."],
        ["recession","衰退","n.","economy","basic","/rɪˈseʃn/","The economy entered a recession."],
        ["subsidy","补贴","n.","economy","intermediate","/ˈsʌbsɪdi/","Farm subsidies support agriculture."],
        ["tariff","关税","n.","economy","advanced","/ˈtærɪf/","Tariffs protect domestic industries."],
        ["entrepreneur","企业家","n.","economy","intermediate","/ˌɒntrəprəˈnɜːr/","Entrepreneurs drive innovation."],
        ["commodity","商品","n.","economy","intermediate","/kəˈmɒdəti/","Oil is a global commodity."],
        ["fiscal","财政的","adj.","economy","advanced","/ˈfɪskl/","Fiscal policy affects the economy."],
        ["deficit","赤字","n.","economy","intermediate","/ˈdefɪsɪt/","The trade deficit has widened."],
        ["surplus","盈余","n.","economy","intermediate","/ˈsɜːpləs/","The budget surplus was unexpected."],
        ["revenue","收入；税收","n.","economy","intermediate","/ˈrevənjuː/","Tax revenue funds public services."],
        ["mortgage","抵押贷款","n.","economy","advanced","/ˈmɔːɡɪdʒ/","They took out a mortgage."],
        ["asset","资产","n.","economy","intermediate","/ˈæset/","Real estate is considered a safe asset."],
        ["liability","负债","n.","economy","advanced","/ˌlaɪəˈbɪləti/","The company has significant liabilities."],
        ["bankruptcy","破产","n.","economy","intermediate","/ˈbæŋkrʌptsi/","The firm filed for bankruptcy."],
        ["dividend","股息","n.","economy","advanced","/ˈdɪvɪdend/","Shareholders received a dividend."]
    ],
    speaking: [
        {q:'Do you think it is important to save money?',a:'Yes, saving is very important. It provides a financial safety net for unexpected expenses and gives you more choices in life. I try to save a portion of my income each month. However, I also believe in enjoying life now rather than saving everything for some distant future—the key is finding the right balance.'},
        {q:'How do you think advertising influences what people buy?',a:'Advertising has a powerful influence on consumer behaviour, often operating on a subconscious level. It creates desires for products we do not really need by associating them with happiness, status, or belonging. Celebrity endorsements and social media influencers amplify this effect. However, consumers are becoming more savvy and skeptical, especially younger generations.'}
    ],
    writing: [
        {q:'Some people believe that advertising has a negative effect on society. To what extent do you agree?',tips:'同意：制造虚假需求、促进消费主义、物化女性。不同意：提供信息、支持免费媒体、促进竞争。结论：需要更严格的广告监管(针对儿童、健康声明等)。'},
        {q:'Consumer goods have become an important part of modern life. Do the advantages outweigh the disadvantages?',tips:'优势：便利、生活质量、经济增长。劣势：环境代价、债务、物质主义。需要可持续消费(sustainable consumption)模式。'}
    ],
    readingTip:'经济文章多含数字、百分比、年份数据。注意trend描述词(rise/fall/fluctuate/plateau)和cause-effect关系。题型：图表匹配、摘要填空。Task1常涉及经济数据描述。'
},

science: {
    label:'科学', icon:'🔬',
    description:'阅读P1/P3极高频(科学研究报告/新发现)；听力Section4常为科学讲座；写作Task2偶尔出现(科研经费/基因工程)；口语Part1可能问(对科学的兴趣)。',
    vocab: [
        ["hypothesis","假设","n.","science","intermediate","/haɪˈpɒθəsɪs/","The hypothesis was confirmed."],
        ["methodology","方法","n.","science","advanced","/ˌmeθəˈdɒlədʒi/","The methodology is clearly explained."],
        ["correlation","相关性","n.","science","advanced","/ˌkɒrəˈleɪʃn/","Correlation does not imply causation."],
        ["empirical","实证的","adj.","science","advanced","/ɪmˈpɪrɪkl/","Empirical evidence supports the theory."],
        ["catalyst","催化剂","n.","science","advanced","/ˈkætəlɪst/","The discovery acted as a catalyst for change."],
        ["molecule","分子","n.","science","intermediate","/ˈmɒlɪkjuːl/","Water molecules consist of H2O."],
        ["organism","有机体","n.","science","intermediate","/ˈɔːɡənɪzəm/","This organism lives in extreme conditions."],
        ["genetic","基因的","adj.","science","intermediate","/dʒɪˈnetɪk/","Genetic engineering raises ethical questions."],
        ["evolution","进化","n.","science","intermediate","/ˌiːvəˈluːʃn/","Evolution occurs over millions of years."],
        ["fossil","化石","n.","science","intermediate","/ˈfɒsl/","Fossils provide evidence of past life."],
        ["synthesis","合成；综合","n.","science","advanced","/ˈsɪnθəsɪs/","The synthesis of data led to new insights."],
        ["quantitative","定量的","adj.","science","advanced","/ˈkwɒntɪtətɪv/","Quantitative data is numerical."],
        ["qualitative","定性的","adj.","science","advanced","/ˈkwɒlɪtətɪv/","Qualitative research explores experiences."],
        ["specimen","标本","n.","science","advanced","/ˈspesɪmɪn/","Specimens were collected for analysis."],
        ["variable","变量","n.","science","intermediate","/ˈveəriəbl/","Temperature was the independent variable."]
    ],
    speaking: [
        {q:'Do you like science?',a:'I find science fascinating, particularly biology and astronomy. The fact that scientists can explain phenomena that seemed mysterious for centuries is amazing. I enjoy watching documentaries about space exploration and the natural world. Even though I did not pursue a science career, I think understanding basic scientific principles helps in everyday life.'},
        {q:'What scientific discovery has had the biggest impact on your life?',a:'The internet is probably the most transformative—it has changed how we access information, communicate, work, and learn. More recently, mRNA vaccine technology has been revolutionary for public health. It is remarkable how quickly scientific advances can reshape society.'}
    ],
    writing: [
        {q:'Scientific research should be carried out and controlled by governments rather than private companies. Do you agree?',tips:'同意：公共利益优先、伦理监管、避免利益冲突。不同意：企业效率更高、市场驱动创新。结论：政府基础研究+企业应用研究互补。'},
        {q:'Animal testing for medical research is necessary. To what extent do you agree?',tips:'同意：医学进步依赖动物实验、替代方法不成熟。反对：动物福利、伦理问题、替代技术(细胞培养/AI模拟)。结论：减少(Reduce)+优化(Refine)+替代(Replace)的3R原则。'}
    ],
    readingTip:'科学文章是阅读P3高频来源。注意：研究目的(aim)→方法(method)→结果(results)→结论(conclusion)的四段结构。判断题型问的是"研究者说了什么"还是"作者认为什么"。'
},

media: {
    label:'媒体', icon:'📺',
    description:'写作Task2中频(社交媒体影响/新闻真实性)；口语Part1/3常问(社交媒体使用/新闻来源)；阅读P1/P2常见媒体类文章；听力Section3可能出现媒体研究讨论。',
    vocab: [
        ["journalism","新闻业","n.","media","intermediate","/ˈdʒɜːnəlɪzəm/","Investigative journalism serves the public."],
        ["propaganda","宣传","n.","media","advanced","/ˌprɒpəˈɡændə/","Propaganda spreads biased information."],
        ["censorship","审查制度","n.","media","advanced","/ˈsensəʃɪp/","Censorship restricts free expression."],
        ["bias","偏见","n.","media","intermediate","/ˈbaɪəs/","Media bias affects public opinion."],
        ["subscription","订阅","n.","media","intermediate","/səbˈskrɪpʃn/","Newspaper subscriptions have declined."],
        ["coverage","报道","n.","media","basic","/ˈkʌvərɪdʒ/","The event received extensive media coverage."],
        ["viral","病毒式传播的","adj.","media","intermediate","/ˈvaɪrəl/","The video went viral overnight."],
        ["podcast","播客","n.","media","intermediate","/ˈpɒdkɑːst/","Podcasts are increasingly popular."],
        ["influencer","网红","n.","media","intermediate","/ˈɪnfluənsər/","Social media influencers shape trends."],
        ["mainstream","主流的","adj.","media","intermediate","/ˈmeɪnstriːm/","Mainstream media faces competition."],
        ["sensationalism","耸人听闻","n.","media","advanced","/senˈseɪʃənəlɪzəm/","Sensationalism sells newspapers."],
        ["tabloid","小报","n.","media","advanced","/ˈtæblɔɪd/","Tabloids focus on celebrity gossip."],
        ["editorial","社论的","adj.","media","advanced","/ˌedɪˈtɔːriəl/","The editorial criticized the policy."],
        ["livestream","直播","n./v.","media","intermediate","/ˈlaɪvstriːm/","The concert was livestreamed worldwide."],
        ["hashtag","话题标签","n.","media","intermediate","/ˈhæʃtæɡ/","The hashtag trended for hours."]
    ],
    speaking: [
        {q:'How do you usually get news?',a:'I mainly get news through social media and news apps on my phone. I follow several reputable news outlets and check their updates throughout the day. However, I try to cross-reference stories from multiple sources to get a balanced view, especially on controversial topics.'},
        {q:'Do you think social media has more advantages or disadvantages?',a:'It has both, but I lean slightly towards the disadvantages. The benefits—instant communication, access to information, community building—are significant. However, the downsides are serious: addiction, privacy erosion, misinformation, and negative impacts on mental health, especially among teenagers. I think better regulation and digital literacy education are essential.'}
    ],
    writing: [
        {q:'Social media has had a negative impact on society. To what extent do you agree?',tips:'同意：信息茧房、虚假信息传播、青少年心理健康危机。不同意：声音民主化、社会运动组织、信息传播。结论：工具中性，问题在于商业模式(attention economy)的设计。'},
        {q:'Newspapers are becoming less popular. What problems does this cause?',tips:'问题：深度调查新闻减少、公众信息素养下降、民主监督弱化。但新媒体也有优势：即时性、互动性、多样性。未来：非营利新闻+数字订阅模式。'}
    ],
    readingTip:'媒体类文章常见于P2难度。注意区分fact(报道的事实)和opinion(评论的观点)。作者态度可能隐含在形容词选择中(dramatic, concerning, promising)。题型：判断题、选择题。'
},

academic: {
    label:'学术', icon:'📝',
    description:'阅读P3的核心话题；听力Section3/4常见学术讨论和讲座；写作Task1/2正式文体需要学术词汇；贯穿所有模块的基础能力。这是提分最关键的词汇领域。',
    vocab: [
        ["hypothesis","假设","n.","academic","intermediate","/haɪˈpɒθəsɪs/","The hypothesis was tested experimentally."],
        ["methodology","方法","n.","academic","advanced","/ˌmeθəˈdɒlədʒi/","The methodology has some limitations."],
        ["correlation","相关性","n.","academic","advanced","/ˌkɒrəˈleɪʃn/","A strong correlation was found."],
        ["empirical","实证的","adj.","academic","advanced","/ɪmˈpɪrɪkl/","Empirical data supports this view."],
        ["paradigm","范式","n.","academic","advanced","/ˈpærədaɪm/","A paradigm shift is needed."],
        ["criterion","标准","n.","academic","basic","/kraɪˈtɪəriən/","Multiple criteria were used."],
        ["framework","框架","n.","academic","intermediate","/ˈfreɪmwɜːk/","A theoretical framework is presented."],
        ["implication","含义；影响","n.","academic","intermediate","/ˌɪmplɪˈkeɪʃn/","The implications are far-reaching."],
        ["valid","有效的","adj.","academic","basic","/ˈvælɪd/","The argument is logically valid."],
        ["bias","偏见","n.","academic","intermediate","/ˈbaɪəs/","Researcher bias must be minimized."],
        ["abstract","摘要；抽象的","n./adj.","academic","advanced","/ˈæbstrækt/","The abstract summarizes key findings."],
        ["cite","引用","v.","academic","intermediate","/saɪt/","The study has been widely cited."],
        ["peer review","同行评审","n.","academic","advanced","","Peer review ensures quality control."],
        ["plagiarism","抄袭","n.","academic","advanced","/ˈpleɪdʒərɪzəm/","Plagiarism is a serious academic offense."],
        ["annotate","注释","v.","academic","advanced","/ˈænəteɪt/","Annotate key passages while reading."]
    ],
    speaking: [
        {q:'Do you prefer studying alone or in a group?',a:'I prefer studying alone for most tasks because I can concentrate better and work at my own pace. However, group study is useful for discussing complex topics and testing each other's understanding. I usually study alone first to grasp the basics, then join group sessions to deepen my understanding through discussion.'},
        {q:'What skills are important for academic success?',a:'Time management is crucial—knowing how to prioritize tasks and avoid procrastination. Critical thinking is equally important; you need to evaluate sources and construct logical arguments, not just memorize information. Writing clearly and concisely is another essential skill. Finally, resilience—academic work involves setbacks and criticism, and the ability to persist through difficulties matters enormously.'}
    ],
    writing: [
        {q:'Some people think that academic success depends mostly on good teachers. Others believe it depends on the attitude of the student. Discuss.',tips:'教师重要：启发兴趣、有效讲解、提供反馈。学生态度更关键：自律、好奇心、努力。结论：好老师激发好态度，但最终取决于学生自己。'}
    ],
    readingTip:'学术类文章是阅读P3的主要内容。关键技能：skimming(略读获取大意)→scanning(扫读找具体信息)→close reading(精读理解论点)。注意学术写作的hedging语言(may, might, could, possibly, suggests, appears)。'
},

general: {
    label:'通用', icon:'📌',
    description:'跨话题通用高频词，覆盖日常交流和学习场景。这些词汇在听说读写四科中都会反复出现，是构建语言基础的核心。',
    vocab: [
        ["significant","重要的","adj.","general","intermediate","/sɪɡˈnɪfɪkənt/","A significant improvement was observed."],
        ["consequence","后果","n.","general","intermediate","/ˈkɒnsɪkwəns/","The consequences were unexpected."],
        ["approach","方法；接近","n./v.","general","intermediate","/əˈprəʊtʃ/","A new approach is needed."],
        ["circumstance","情况","n.","general","intermediate","/ˈsɜːkəmstæns/","Under the circumstances, it was wise."],
        ["perspective","观点","n.","general","intermediate","/pəˈspektɪv/","Consider it from a different perspective."],
        ["contribute","贡献","v.","general","intermediate","/kənˈtrɪbjuːt/","Many factors contribute to this."],
        ["establish","建立","v.","general","intermediate","/ɪˈstæblɪʃ/","The company was established in 1995."],
        ["essential","必要的","adj.","general","intermediate","/ɪˈsenʃl/","Water is essential for life."],
        ["fundamental","基本的","adj.","general","intermediate","/ˌfʌndəˈmentl/","This is a fundamental principle."],
        ["demonstrate","展示；证明","v.","general","intermediate","/ˈdemənstreɪt/","The data demonstrates a clear trend."],
        ["inevitable","不可避免的","adj.","general","advanced","/ɪnˈevɪtəbl/","Change is inevitable."],
        ["adequate","充足的","adj.","general","intermediate","/ˈædɪkwət/","Current measures are not adequate."],
        ["explicit","明确的","adj.","general","intermediate","/ɪkˈsplɪsɪt/","The instructions were explicit."],
        ["implicit","含蓄的","adj.","general","advanced","/ɪmˈplɪsɪt/","There was an implicit understanding."],
        ["predominantly","主要地","adv.","general","advanced","/prɪˈdɒmɪnəntli/","The population is predominantly urban."]
    ],
    speaking: [
        {q:'What is important to you in life?',a:'Health comes first—without it, nothing else matters much. Strong relationships with family and friends are equally important; they provide support and meaning. I also value personal growth—constantly learning and improving gives life direction and satisfaction.'},
        {q:'Do you think people today are busier than in the past?',a:'In some ways yes, in others no. Technology has automated many tasks, but it has also blurred the boundaries between work and personal time. The constant connectivity means we are always "on." People in the past may have had more physically demanding lives, but we face a different kind of busyness—mental overload and fragmented attention.'}
    ],
    writing: [],
    readingTip:'通用词汇是理解所有雅思文章的基础。建议：每天背20-30个，结合例句记忆。标注已掌握/待复习词汇。特别注意一词多义(如：address=地址/解决, figure=数字/人物/理解)。'
}

};

// Helper: get vocab for a specific topic
function getTopicVocab(topicId){
    var data = TOPIC_DATA[topicId];
    return data ? data.vocab : [];
}

// Helper: get speaking questions for a topic
function getTopicSpeaking(topicId){
    var data = TOPIC_DATA[topicId];
    return data ? data.speaking : [];
}

// Helper: get writing prompts for a topic
function getTopicWriting(topicId){
    var data = TOPIC_DATA[topicId];
    return data ? data.writing : [];
}
