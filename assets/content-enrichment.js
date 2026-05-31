// ========== 写作范文扩充 + 听力场景扩充 ==========

// 追加写作范文到写作内容中 (在现有writing-extra.js基础上)
if(typeof writingExtraEssays === 'undefined') window.writingExtraEssays = [];

writingExtraEssays.push(
{
    title:'范文: 科技话题 - 远程办公 (Band 7.5)',
    task:'task2',
    question:'Some people think that the increasing use of technology for remote working and online learning is a positive development, while others believe it has negative effects. Discuss both views and give your opinion.',
    essay:'In recent years, the rapid advancement of digital technology has fundamentally transformed how people work and learn. While some view this shift towards remote working and online education as beneficial, others express concerns about its drawbacks. This essay will examine both perspectives before presenting my own view.\n\nOn the one hand, proponents argue that technology-enabled remote work and learning offer unprecedented flexibility and accessibility. Employees no longer need to spend hours commuting, which saves both time and money while reducing traffic congestion and carbon emissions. Similarly, online learning platforms have democratized education, allowing students from remote areas or disadvantaged backgrounds to access high-quality courses that were previously unavailable to them. Furthermore, companies can reduce overhead costs by minimizing office space, and these savings can be redirected towards innovation and employee benefits.\n\nOn the other hand, critics raise valid concerns about the social and psychological impacts of this trend. Remote working can lead to feelings of isolation and blurred boundaries between professional and personal life. The lack of face-to-face interaction may hinder team collaboration, spontaneous creativity, and the development of workplace culture. In education, online learning lacks the social dimension that is crucial for developing interpersonal skills, and students may struggle with self-discipline and motivation without the structure of a physical classroom.\n\nIn my opinion, the benefits of remote working and online learning outweigh the drawbacks, but only when implemented thoughtfully. A hybrid model that combines the flexibility of remote access with regular in-person interaction seems to offer the best of both worlds. Employers and educators should focus on maximizing the advantages of technology while actively mitigating its negative effects through policies that promote work-life balance, social connection, and mental well-being.'
},
{
    title:'范文: 环境话题 - 塑料污染 (Band 8)',
    task:'task2',
    question:'The amount of plastic waste in the environment is increasing rapidly. What problems does this cause, and what measures can be taken to address these issues?',
    essay:'The proliferation of plastic waste has emerged as one of the most pressing environmental challenges of our time. This essay will first examine the severe problems caused by plastic pollution and then propose a range of measures to tackle this crisis.\n\nPlastic waste poses multiple threats to ecosystems and human health. The most visible problem is the devastating impact on marine life. Millions of marine animals die annually from ingesting plastic or becoming entangled in plastic debris. Microplastics, which result from the breakdown of larger items, have now been detected in drinking water, seafood, and even human bloodstreams, raising serious health concerns. Furthermore, plastic pollution degrades natural landscapes and imposes significant economic costs on tourism and fishing industries. The sheer durability of plastic—taking hundreds of years to decompose—means that the problem compounds over time.\n\nAddressing this crisis requires coordinated action at multiple levels. At the governmental level, stricter regulations are needed to limit single-use plastics. Many countries have successfully implemented bans on plastic bags, straws, and disposable cutlery, resulting in dramatic reductions in consumption. Extended producer responsibility schemes, where manufacturers bear the cost of recycling their products, can incentivize more sustainable packaging design. At the industry level, investment in research and development of biodegradable alternatives is essential. Materials derived from plant starches, algae, and mushroom-based packaging show promise as viable replacements.\n\nIndividuals also have a crucial role to play. Simple behavioral changes—using reusable bags, bottles, and containers—can collectively make a significant difference. Consumer pressure can drive companies to adopt more sustainable practices. Educational campaigns in schools and communities can foster a culture of environmental responsibility from an early age.\n\nIn conclusion, plastic pollution is a complex problem requiring a multi-pronged solution involving governments, businesses, and individuals. While the challenge is daunting, the combination of regulation, innovation, and behavioral change can significantly mitigate the crisis if implemented with sufficient urgency and commitment.'
},
{
    title:'范文: 教育话题 - 大学教育目的 (Band 7)',
    task:'task2',
    question:'Some people believe that the main purpose of university education is to help graduates find better jobs, while others think university education has wider benefits for individuals and society. Discuss both views and give your opinion.',
    essay:'The purpose of higher education has been the subject of considerable debate. While some view universities primarily as pathways to employment, others argue that their value extends far beyond job preparation. This essay will discuss both perspectives.\n\nThose who emphasize the career-oriented purpose of universities have valid points. In an increasingly competitive job market, university credentials serve as essential signals to employers. Professional degree programs in fields like engineering, medicine, and law provide the specialized knowledge and skills that graduates need for their careers. Furthermore, given the substantial cost of higher education in many countries, students and their families understandably expect a return on their investment in the form of better employment prospects and higher lifetime earnings.\n\nHowever, reducing universities to mere job-training institutions overlooks their broader societal role. Universities cultivate critical thinking, intellectual curiosity, and the ability to engage with complex ideas—skills that enrich all aspects of life, not just careers. They serve as centers of research and innovation, advancing human knowledge in ways that benefit everyone. Moreover, the university experience exposes students to diverse perspectives, fostering tolerance, empathy, and a broader worldview that is essential for functioning democracies.\n\nIn my view, the dichotomy between job preparation and broader education is a false one. The skills most valued by employers today—critical thinking, communication, problem-solving, and adaptability—are precisely those developed through a well-rounded university education. The challenge for universities is to maintain their commitment to intellectual development while also ensuring graduates are equipped for the practical demands of the modern workplace.'
}
);

// 追加听力场景
if(typeof listeningExtraScenes === 'undefined') window.listeningExtraScenes = [];

listeningExtraScenes.push(
{
    title:'场景: 租房咨询 (Housing Enquiry) - Section 1难度',
    script:'Agent: Good morning, Sunny Real Estate. How may I help you?\nClient: Hi, I am looking to rent a one-bedroom flat in the city center. My budget is around 1,200 pounds per month.\nAgent: I see. We have several options matching your criteria. Are you looking for furnished or unfurnished?\nClient: Furnished, please. And it must have parking available.\nAgent: We have a lovely flat on Queen Street. It is a one-bedroom furnished property on the third floor with a lift. The rent is 1,150 pounds per month, including water but excluding electricity and gas.\nClient: That sounds interesting. Does it have parking?\nAgent: Yes, there is underground parking available for an additional 80 pounds per month.\nClient: What about public transport nearby?\nAgent: The nearest tube station is just a five-minute walk, and there are several bus routes right outside the building.\nClient: When can I schedule a viewing?\nAgent: The landlord is available this Thursday at 11am or Saturday at 2pm.',
    questions:[
        {q:'The client wants a flat with ____ bedroom(s).',ans:'one'},
        {q:'The budget is ____ pounds per month.',ans:'1200'},
        {q:'The flat is on ____ Street.',ans:'Queen'},
        {q:'The rent is ____ pounds per month.',ans:'1150'},
        {q:'Parking costs an extra ____ pounds per month.',ans:'80'},
        {q:'The nearest tube station is a ____ minute walk.',ans:'five'}
    ]
},
{
    title:'场景: 校园导览 (Campus Tour) - Section 2难度',
    script:'Good afternoon everyone, and welcome to Westfield University. My name is Rebecca, and I will be showing you around today. The tour will last approximately one hour.\n\nLet me start with some key facts about our university. Westfield was established in 1905 and currently has a student population of 18,500, including 4,200 international students from 95 different countries.\n\nTo your left is the main library, which underwent a major renovation in 2020 at a cost of 12 million pounds. It now houses over 1.5 million books and provides 2,400 study spaces, including 300 computer workstations. The library is open 24 hours a day during exam periods.\n\nAhead of us is the Science and Engineering Complex, completed in 2019. It contains 45 laboratories and a state-of-the-art robotics center. The building was designed to be environmentally friendly, with solar panels providing about 30 percent of its energy needs.\n\nFinally, the Student Services Centre is in the white building on your right. You can access counseling, career advice, disability support, and financial guidance there.',
    questions:[
        {q:'The university was established in ____.',ans:'1905'},
        {q:'There are ____ international students.',ans:'4200'},
        {q:'The library has ____ study spaces.',ans:'2400'},
        {q:'The Science Complex contains ____ laboratories.',ans:'45'},
        {q:'Solar panels provide ____ percent of energy for the Science Complex.',ans:'30'}
    ]
},
{
    title:'场景: 学术讲座 - 气候变化 (Lecture) - Section 4难度',
    script:'Good morning. Today we will examine the relationship between climate change and global food security. This is a topic of increasing urgency as the world population is projected to reach 9.7 billion by 2050.\n\nLet us begin with the direct impacts. Rising temperatures are already reducing crop yields in many regions. Studies indicate that for every 1 degree Celsius increase in global average temperature, wheat yields decline by approximately 6 percent, rice by around 3 percent, and maize by more than 7 percent. These figures are alarming when we consider that the world may warm by 2 to 3 degrees by the end of this century under current emission trajectories.\n\nWater scarcity compounds this challenge. Agriculture currently accounts for about 70 percent of global freshwater withdrawals. Climate change is disrupting precipitation patterns, with some regions experiencing more frequent and severe droughts while others face destructive flooding. The World Bank estimates that water scarcity could reduce agricultural output in affected regions by up to 25 percent by 2050.\n\nThere are also indirect effects to consider. Warmer temperatures expand the range of agricultural pests and diseases. The coffee berry borer, for instance, has spread to higher altitudes as temperatures have risen, threatening coffee production in regions like Ethiopia and Colombia. Similarly, warmer ocean temperatures are causing fish stocks to migrate towards the poles, disrupting fisheries that millions of people depend on for protein.\n\nAdaptation strategies are essential. These include developing heat-resistant crop varieties through genetic modification and traditional breeding, improving irrigation efficiency, diversifying crop systems, and implementing early warning systems for extreme weather events.',
    questions:[
        {q:'The world population is projected to reach ____ billion by 2050.',ans:'9.7'},
        {q:'For each degree of warming, wheat yields decline by ____ percent.',ans:'6'},
        {q:'Agriculture accounts for ____ percent of global freshwater use.',ans:'70'},
        {q:'Water scarcity could reduce agricultural output by ____ percent by 2050.',ans:'25'}
    ]
}
);
