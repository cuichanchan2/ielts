// 剑桥雅思真题资源 - 整合夸克网盘PDF在线预览+下载
function renderResources() {
    const shareUrl = 'https://pan.quark.cn/s/7f3d24586cd2';
    const resources = [
        {num:1,size:'28.3 MB',pages:162,diff:'⭐',stage:'入门',desc:'雅思考试入门级真题，适合了解考试题型和难度。'},
        {num:2,size:'0.6 MB',pages:81,diff:'⭐',stage:'入门',desc:'早期官方真题，难度适中。文本型PDF，可复制文字。'},
        {num:3,size:'3.5 MB',pages:179,diff:'⭐⭐',stage:'基础',desc:'经典真题集，题型全面。听力含多种口音。'},
        {num:7,size:'52.5 MB',pages:181,diff:'⭐⭐⭐',stage:'强化',desc:'广受好评的真题集。题目质量高，解析详细。'},
        {num:8,size:'9.7 MB',pages:173,diff:'⭐⭐⭐',stage:'强化',desc:'难度略高，阅读文章长度增加。适合强化训练。'},
        {num:9,size:'22.2 MB',pages:165,diff:'⭐⭐⭐',stage:'强化',desc:'题型与近年考试高度相似。写作话题涵盖高频考点。'},
        {num:11,size:'12.3 MB',pages:145,diff:'⭐⭐⭐⭐',stage:'冲刺',desc:'较新真题集，反映近年考试趋势。阅读重逻辑推理。'},
        {num:12,size:'32.8 MB',pages:138,diff:'⭐⭐⭐⭐',stage:'冲刺',desc:'接近当前考试难度。口语Part2话题新颖。'},
        {num:13,size:'2.9 MB',pages:143,diff:'⭐⭐⭐⭐',stage:'冲刺',desc:'2018年出版。听力S3/S4难度明显提升。'},
        {num:14,size:'10.8 MB',pages:143,diff:'⭐⭐⭐⭐',stage:'冲刺',desc:'2019年出版。题型与当前机考高度一致。考前重点练习。'},
    ];

    var grid = document.getElementById('resourcesGrid');
    if (!grid) return;

    var gridHtml = '';
    resources.forEach(function(r) {
        var sizeNum = parseFloat(r.size);
        var bg = sizeNum > 20 ? '#FEE2E2' : sizeNum > 5 ? '#FEF3C7' : '#D1FAE5';
        gridHtml += '<div class="card">' +
            '<div style="display:flex;justify-content:space-between;align-items:start">' +
            '<h3>📘 剑桥雅思真题' + r.num + '</h3>' +
            '<span style="font-size:0.7rem;padding:3px 8px;border-radius:4px;background:' + bg + '">' + r.size + '</span>' +
            '</div>' +
            '<p style="color:var(--t2);font-size:0.82rem;margin:6px 0">' + r.pages + '页 | 难度:' + r.diff + ' | 阶段:' + r.stage + '</p>' +
            '<p style="color:var(--t2);font-size:0.78rem;margin-bottom:8px">' + r.desc + '</p>' +
            '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
            '<a href="' + shareUrl + '" target="_blank" class="btn btn-p btn-sm">📥 在线查看+下载</a>' +
            '<button class="btn btn-o btn-sm" onclick="document.getElementById(\'resourceNote\').style.display=\'block\'">📖 使用建议</button>' +
            '</div></div>';
    });
    grid.innerHTML = gridHtml;

    // Table
    var table = document.getElementById('resourcesTable');
    if (!table) return;
    var tableHtml = '<tr style="border-bottom:1px solid var(--b);background:#F8FAFC">' +
        '<th style="padding:10px;text-align:left">真题</th><th style="padding:10px;text-align:left">大小</th>' +
        '<th style="padding:10px;text-align:left">页数</th><th style="padding:10px;text-align:left">适用阶段</th>' +
        '<th style="padding:10px;text-align:left">难度</th></tr>';
    resources.forEach(function(r) {
        tableHtml += '<tr style="border-bottom:1px solid var(--b)">' +
            '<td style="padding:10px"><strong>剑桥雅思真题' + r.num + '</strong></td>' +
            '<td style="padding:10px;color:var(--t2)">' + r.size + '</td>' +
            '<td style="padding:10px;color:var(--t2)">' + r.pages + '</td>' +
            '<td style="padding:10px"><span class="tag">' + r.stage + '</span></td>' +
            '<td style="padding:10px">' + r.diff + '</td></tr>';
    });
    table.innerHTML = tableHtml;
}
