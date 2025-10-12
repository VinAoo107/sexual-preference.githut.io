// 评分数据存储
let assessmentData = {
    scores: {}
};

// 评估项目数据 - 严格按照文字版评分表
const assessmentItems = {
    "环境与场景": {
        "住宅": [
            "卧室", "浴室", "客厅/沙发", "厨房"
        ],
        "外出": [
            "温泉/泳池", "车里", "酒店房间"
        ],
        "其它": [
            "明亮的环境中", "黑暗中", "窗边", "镜子前", "半公开场合 (如试衣间、楼梯间)"
        ]
    },
    "身体部位偏好": {
        "恋足": [
            "亲吻/舔舐Ta的脚", "被 亲吻/舔舐脚", "给Ta足交", "被足交"
        ],
        "恋乳": [
            "舔舐/揉捏/轻咬 胸部", "被 舔舐/揉捏/轻咬 胸部"
        ],
        "恋臀": [
            "亲吻/抚摸/轻咬 臀部", "被 亲吻/抚摸/轻咬 臀部"
        ],
        "其他部位": [
            "脸", "嘴唇", "锁骨", "手/手指", "腿", "耳朵", "脖子"
        ]
    },
    "亲密行为": {
        "亲密互动": [
            "爱抚", "被爱抚", "舔舐/吸吮", "被 舔舐/吸吮", "种草莓", "被种草莓"
        ],
        "手部": [
            "指交/撸管", "被 指交/撸管"
        ],
        "口部": [
            "帮Ta口交", "被Ta口交"
        ],
        "后庭": [
            "肛交", "手指肛交"
        ],
        "体位": [
            "传教士体位", "女上位", "后入式", "站立式"
        ],
        "方式": [
            "体内射精", "口中射精", "手工射精"
        ],
        "言语": [
            "爱语/情话", "脏话/下流话", "骚话/挑逗的话"
        ]
    },
    "BDSM": {
        "角色心理": [
            "扮演命令方 (Dom/S)", "扮演顺从方 (Sub/M)", "角色可互换 (Switch)", "羞辱（Dom）", "被羞辱(Sub)"
        ],
        "SM": [
            "深喉", "颜射", "吞精", "嘴喂食", "被嘴喂食", "足喂食", "被足喂食", "寸止", "龟头责", "前列腺按摩/高潮", "激烈指交/指奸", "圣水浴", "憋尿/失禁/潮喷"
        ],
        "束缚": [
            "轻度束缚(绑手/脚)", "中度束缚(如十字架)", "重度束缚(如木乃伊)"
        ],
        "体罚": [
            "罚站、跪、蹲等", "罚运动（下蹲、平板支撑等）"
        ],
        "打屁股": [
            "轻度(泛红)", "中度(红肿)", "重度(破皮流血)"
        ],
        "器具": [
            "口球", "项圈", "眼罩/头套", "手铐/脚镣", "低温蜡烛"
        ],
        "露出": [
            "轻度（短暂露出私密部位）", "中度（一段时间暴露私密部位或短时间暴露整个身体）", "重度（长时间暴露整个身体）", "人前露出", "人后露出"
        ]
    },
    "情趣与角色扮演": {
        "制服诱惑": [
            "医生/护士", "职场装", "警察", "外卖/快递员", "Cosplay (二次元角色)", "异性装扮 (Cross-dressing)"
        ],
        "角色扮演": [
            "职业场景 (如家教、按摩师)", "亲戚场景 (姐弟、兄妹)", "惩罚场景 (如犯错被罚、卖身还债)", "宠物扮演 (Pet Play)"
        ],
        "情趣用品": [
            "情趣内衣", "丝袜", "润滑油", "震动棒/按摩棒", "跳蛋", "肛塞/尾巴"
        ]
    }
};

// 评分标准 - 严格按照文字版评分表
const scoreLabels = {
    'sss': { label: "非常喜欢/渴望", class: "very-like", color: "#00FF00" },
    'ss': { label: "喜欢/想要", class: "like", color: "#90EE90" },
    's': { label: "一般/能接受", class: "okay", color: "#FFFF00" },
    'no': { label: "不喜欢/很勉强", class: "dislike", color: "#FFA500" },
    'X': { label: "绝对拒绝/底线", class: "afraid", color: "#FF4500" },
    '?': { label: "不了解/好奇", class: "unknown", color: "#808080" }
};

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在评分页面
    if (window.location.pathname.includes('assessment.html')) {
        initAssessment();
    }
    // 检查是否在结果页面
    else if (window.location.pathname.includes('results.html')) {
        initResults();
    }
});

// 开始评分
function startAssessment() {
    window.location.href = 'assessment.html';
}

// 初始化评分页面
function initAssessment() {
    loadAllCategories();
    loadExistingScores();
}

// 加载所有分类到单个页面
function loadAllCategories() {
    const container = document.querySelector('.assessment-container');
    
    let html = `
        <div class="all-categories">
            <h1 class="main-title">性偏好评分表</h1>
            <div class="scoring-standards-section">
                <h2 class="standards-title">评分标准</h2>
                <div class="score-guide">
                    <div class="score-item sss">sss - 非常喜欢/渴望</div>
                    <div class="score-item ss">ss - 喜欢/想要</div>
                    <div class="score-item s">s - 一般/能接受</div>
                    <div class="score-item no">no - 不喜欢/很勉强</div>
                    <div class="score-item X">X - 绝对拒绝/底线</div>
                    <div class="score-item unknown">? - 不了解/好奇</div>
                </div>
            </div>
            <p class="instruction">请根据您的真实感受为每个项目评分</p>
    `;
    
    // 遍历所有分类
    Object.entries(assessmentItems).forEach(([categoryName, categoryData]) => {
        html += `
            <div class="category-section">
                <h2 class="category-title">${categoryName}</h2>
                ${generateCategoryHTML(categoryData)}
            </div>
        `;
    });
    
    html += `
        </div>
        
        <div class="navigation">
            <button class="nav-btn" id="complete-btn" onclick="completeAssessment()">
                完成评分
            </button>
        </div>
    `;
    
    container.innerHTML = html;
    
    // 绑定评分按钮事件
    bindScoreButtons();
}

// 绑定评分按钮事件
function bindScoreButtons() {
    const scoreButtons = document.querySelectorAll('.score-btn');
    scoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const item = this.closest('.item').querySelector('.item-name').textContent;
            const score = this.getAttribute('data-score');
            setScore(item, score, event);
        });
    });
}

// 完成评分
function completeAssessment() {
    // 保存评分数据
    localStorage.setItem('assessmentScores', JSON.stringify(assessmentData.scores));
    
    // 跳转到结果页面
    window.location.href = 'results.html';
}

// 生成分类HTML
function generateCategoryHTML(categoryData) {
    let html = '';
    
    Object.entries(categoryData).forEach(([subcategory, items]) => {
        html += `
            <div class="subcategory">
                <h3 class="subcategory-title">${subcategory}</h3>
                <div class="items-container">
                    ${items.map(item => generateItemHTML(item)).join('')}
                </div>
            </div>
        `;
    });
    
    return html;
}

// 生成项目HTML
function generateItemHTML(item) {
    return `
        <div class="item">
            <div class="item-name">${item}</div>
            <div class="score-buttons">
                ${Object.entries(scoreLabels).map(([score, data]) => `
                    <button class="score-btn ${data.class}" data-score="${score}">
                        ${score}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// 设置评分
function setScore(item, score, event) {
    assessmentData.scores[item] = score;
    
    // 更新按钮状态
    const itemElement = event.target.closest('.item');
    const scoreButtons = itemElement.querySelectorAll('.score-btn');
    scoreButtons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // 保存到本地存储
    localStorage.setItem('assessmentScores', JSON.stringify(assessmentData.scores));
}

// 加载已有评分
function loadExistingScores() {
    const savedScores = localStorage.getItem('assessmentScores');
    if (savedScores) {
        assessmentData.scores = JSON.parse(savedScores);
        
        // 恢复评分状态
        Object.entries(assessmentData.scores).forEach(([item, score]) => {
            const itemElements = document.querySelectorAll('.item');
            itemElements.forEach(itemElement => {
                const itemName = itemElement.querySelector('.item-name').textContent;
                if (itemName === item) {
                    const scoreButtons = itemElement.querySelectorAll('.score-btn');
                    scoreButtons.forEach(btn => {
                        if (btn.getAttribute('data-score') === score) {
                            btn.classList.add('selected');
                        }
                    });
                }
            });
        });
    }
}

// 初始化结果页面
function initResults() {
    const savedScores = localStorage.getItem('assessmentScores');
    if (savedScores) {
        assessmentData.scores = JSON.parse(savedScores);
        displayResults();
    } else {
        // 没有数据，跳转到主页
        window.location.href = 'index.html';
    }
}

// 显示结果
function displayResults() {
    const container = document.querySelector('.results-container');
    container.innerHTML = generateResultsTable();
}

// 生成结果表格
function generateResultsTable() {
    let html = `
        <div class="results-header">
            <h1>您的性偏好评分结果</h1>
            <div class="action-buttons">
                <div class="export-dropdown">
                    <button class="action-btn" onclick="toggleExportDropdown()">导出结果 ▼</button>
                    <div class="export-dropdown-content" id="exportDropdown">
                        <a href="#" onclick="exportResults('html')">导出为HTML</a>
                        <a href="#" onclick="exportResults('image')">导出为图片</a>
                    </div>
                </div>
                <button class="action-btn" onclick="startNewAssessment()">重新评分</button>
                <button class="action-btn" onclick="goHome()">返回首页</button>
            </div>
        </div>
        
        <div class="results-table-container">
            <table class="results-table">
                <thead>
                    <tr>
                        <th>大类</th>
                        <th>子类</th>
                        <th>具体项目</th>
                        <th>接受程度评分</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // 遍历所有分类生成表格行
    Object.entries(assessmentItems).forEach(([categoryName, categoryData]) => {
        Object.entries(categoryData).forEach(([subcategoryName, items]) => {
            items.forEach((item, index) => {
                const score = assessmentData.scores[item] || '?';
                const scoreDescription = getScoreDescription(score);
                
                html += `
                    <tr>
                        <td>${index === 0 ? categoryName : ''}</td>
                        <td>${subcategoryName}</td>
                        <td>${item}</td>
                        <td class="score-cell">
                            <span class="score-display score-${score}">${score} - ${scoreDescription}</span>
                        </td>
                    </tr>
                `;
            });
        });
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

// 获取评分描述
function getScoreDescription(score) {
    return scoreLabels[score]?.label || '未评分';
}

// 切换导出下拉菜单
function toggleExportDropdown() {
    const dropdown = document.getElementById('exportDropdown');
    dropdown.classList.toggle('show');
}

// 点击页面其他地方关闭下拉菜单
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('exportDropdown');
    const button = document.querySelector('.export-dropdown button');
    
    if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// 导出结果
function exportResults(format) {
    // 关闭下拉菜单
    const dropdown = document.getElementById('exportDropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    
    if (format === 'html') {
        exportAsHTML();
    } else if (format === 'image') {
        exportAsImage();
    }
}

// 导出为HTML
function exportAsHTML() {
    const table = document.querySelector('.results-table');
    const tableHTML = table.outerHTML;
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>性偏好评分结果</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    background-color: #1a1a1a;
                    color: #FFFFFF;
                }
                table { 
                    border-collapse: collapse; 
                    width: 100%; 
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 15px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 165, 0, 0.2);
                }
                th, td { 
                    border: 1px solid rgba(255, 255, 255, 0.1); 
                    padding: 12px 15px; 
                    text-align: center; 
                }
                th { 
                    background: #FFA500; 
                    color: #000; 
                    font-weight: bold;
                }
                .score-display { 
                    font-weight: bold; 
                    padding: 5px 10px; 
                    border-radius: 15px; 
                    text-align: center; 
                }
                .score-sss { background: #00AA00; color: #FFFFFF; border: 2px solid #00FF00; }
                .score-ss { background: #228B22; color: #FFFFFF; border: 2px solid #90EE90; }
                .score-s { background: #B8860B; color: #FFFFFF; border: 2px solid #FFFF00; }
                .score-no { background: #CD853F; color: #FFFFFF; border: 2px solid #FFA500; }
                .score-X { background: #8B4513; color: #FFFFFF; border: 2px solid #FF4500; }
                .score-unknown { background: #696969; color: #FFFFFF; border: 2px solid #808080; }
                .score-cell { text-align: center; }
                .score-description { 
                    display: block; 
                    font-size: 0.9rem; 
                    margin-top: 5px; 
                    color: #CCCCCC; 
                }
            </style>
        </head>
        <body>
            <h1 style="color: #FFA500; text-align: center;">性偏好评分结果</h1>
            <p style="text-align: center; color: #CCCCCC;">导出时间: ${new Date().toLocaleString()}</p>
            ${tableHTML}
        </body>
        </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '性偏好评分结果.html';
    a.click();
    URL.revokeObjectURL(url);
}

// 导出为图片
function exportAsImage() {
    const table = document.querySelector('.results-table');
    if (!table) {
        alert('未找到评分结果表格！');
        return;
    }

    // 使用html2canvas库来截图
    if (typeof html2canvas === 'undefined') {
        // 如果html2canvas未加载，先加载它
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = function() {
            captureTableAsImage();
        };
        document.head.appendChild(script);
    } else {
        captureTableAsImage();
    }
}

// 捕获表格为图片
function captureTableAsImage() {
    const table = document.querySelector('.results-table');
    
    // 创建一个临时容器来渲染表格，以便应用特定的导出样式
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px'; // 移出视口
    tempDiv.style.width = table.offsetWidth + 'px'; // 保持原始宽度
    tempDiv.style.backgroundColor = '#1a1a1a'; // 确保背景是深色
    tempDiv.style.padding = '20px'; // 添加一些内边距
    tempDiv.style.boxSizing = 'content-box'; // 确保宽度计算正确

    const tableClone = table.cloneNode(true);

    // 应用导出图片专用样式
    tableClone.style.color = '#FFFFFF'; // 字体颜色改为白色
    tableClone.style.fontSize = '16px'; // 增大字体
    tableClone.querySelectorAll('th, td').forEach(el => {
        el.style.fontSize = '16px'; // 确保所有单元格字体增大
        el.style.borderColor = 'rgba(255, 255, 255, 0.3)'; // 调整边框颜色
    });
    
    // 表格头部（th）保持黑色字体并居中对齐
    tableClone.querySelectorAll('th').forEach(el => {
        el.style.color = '#000000'; // 表格头部字体保持黑色
        el.style.backgroundColor = '#FFA500'; // 确保背景是橙色
        el.style.textAlign = 'center'; // 居中对齐
    });
    
    // 表格内容（td）使用白色字体并居中对齐
    tableClone.querySelectorAll('td').forEach(el => {
        el.style.color = '#FFFFFF'; // 表格内容字体为白色
        el.style.textAlign = 'center'; // 居中对齐
    });
    tableClone.querySelectorAll('.score-display').forEach(el => {
        el.style.fontSize = '16px'; // 确保评分显示字体增大
    });
    tableClone.querySelectorAll('.score-description').forEach(el => {
        el.style.fontSize = '16px'; // 确保描述字体增大
    });
    // 移除可能影响图片背景的样式，例如渐变背景
    tableClone.style.background = 'none'; 
    tableClone.style.boxShadow = 'none';

    tempDiv.appendChild(tableClone);
    document.body.appendChild(tempDiv);

    html2canvas(tempDiv, {
        scale: 2, // 提高分辨率
        backgroundColor: '#1a1a1a', // 确保背景色为深色
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
            // 在克隆的文档中，确保body的背景色是深色
            clonedDoc.body.style.backgroundColor = '#1a1a1a';
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = '性偏好评分结果.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        document.body.removeChild(tempDiv); // 移除临时容器
    }).catch(error => {
        console.error('导出图片失败:', error);
        alert('导出图片失败，请稍后再试。');
        document.body.removeChild(tempDiv); // 移除临时容器
    });
}

// 开始新的评分
function startNewAssessment() {
    if (confirm('确定要开始新的评分吗？当前评分将被清除。')) {
        localStorage.removeItem('assessmentScores');
        window.location.href = 'assessment.html';
    }
}

// 返回首页
function goHome() {
    window.location.href = 'index.html';
}