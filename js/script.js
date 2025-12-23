// 评分数据存储
let assessmentData = {
    personalInfo: {
        gender: '',
        age: '',
        country: '',
        province: '',
        city: ''
    },
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
            "吻足", "舔舐足", "足交"
        ],
        "恋乳": [
            "舔舐胸部", "揉捏胸部"
        ],
        "恋臀": [
            "抚摸臀部", "亲吻/轻咬臀部"
        ],
        "其他部位": [
            "脸", "嘴唇", "锁骨", "手/手指", "腿", "耳朵", "脖子"
        ]
    },
    "亲密行为": {
        "亲密互动": [
            "爱抚", "拥抱", "舔舐", "吸吮", "种草莓"
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
            "扮演命令方 (Dom/S)", "扮演顺从方 (Sub/M)", "角色可互换 (Switch)"
        ],
        "SM": [
            "深喉", "颜射", "吞精", "嘴喂食",  "足喂食",  "寸止", "龟头责", "前列腺按摩", "激烈指交/指奸", "圣水浴", "憋尿/失禁"
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

// 地区数据
const regionData = {
    "中国": {
        "北京市": ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区"],
        "天津市": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "滨海新区", "宁河区", "静海区", "蓟州区"],
        "上海市": ["黄浦区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明区"],
        "重庆市": ["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "綦江区", "大足区", "渝北区", "巴南区", "黔江区", "长寿区", "江津区", "合川区", "永川区", "南川区", "璧山区", "铜梁区", "潼南区", "荣昌区", "开州区", "梁平区", "武隆区"],
        "河北省": ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"],
        "山西省": ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"],
        "内蒙古自治区": ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"],
        "辽宁省": ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"],
        "吉林省": ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州"],
        "黑龙江省": ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区"],
        "江苏省": ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"],
        "浙江省": ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市", "丽水市"],
        "安徽省": ["合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市"],
        "福建省": ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"],
        "江西省": ["南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市"],
        "山东省": ["济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市"],
        "河南省": ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市", "济源市"],
        "湖北省": ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施土家族苗族自治州", "仙桃市", "潜江市", "天门市", "神农架林区"],
        "湖南省": ["长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州"],
        "广东省": ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"],
        "广西壮族自治区": ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"],
        "海南省": ["海口市", "三亚市", "三沙市", "儋州市", "五指山市", "琼海市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"],
        "四川省": ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"],
        "贵州省": ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"],
        "云南省": ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"],
        "西藏自治区": ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区"],
        "陕西省": ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"],
        "甘肃省": ["兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州"],
        "青海省": ["西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"],
        "宁夏回族自治区": ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"],
        "新疆维吾尔自治区": ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区", "石河子市", "阿拉尔市", "图木舒克市", "五家渠市", "北屯市", "铁门关市", "双河市", "可克达拉市", "昆玉市", "胡杨河市"],
        "香港特别行政区": ["中西区", "湾仔区", "东区", "南区", "油尖旺区", "深水埗区", "九龙城区", "黄大仙区", "观塘区", "荃湾区", "屯门区", "元朗区", "北区", "大埔区", "沙田区", "西贡区", "葵青区", "离岛区"],
        "澳门特别行政区": ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路氹城"]
    },
    "美国": {
        "阿拉巴马州": [],
        "阿拉斯加州": [],
        "亚利桑那州": [],
        "阿肯色州": [],
        "加利福尼亚州": [],
        "科罗拉多州": [],
        "康涅狄格州": [],
        "特拉华州": [],
        "佛罗里达州": [],
        "佐治亚州": [],
        "夏威夷州": [],
        "爱达荷州": [],
        "伊利诺伊州": [],
        "印第安纳州": [],
        "爱荷华州": [],
        "堪萨斯州": [],
        "肯塔基州": [],
        "路易斯安那州": [],
        "缅因州": [],
        "马里兰州": [],
        "马萨诸塞州": [],
        "密歇根州": [],
        "明尼苏达州": [],
        "密西西比州": [],
        "密苏里州": [],
        "蒙大拿州": [],
        "内布拉斯加州": [],
        "内华达州": [],
        "新罕布什尔州": [],
        "新泽西州": [],
        "新墨西哥州": [],
        "纽约州": [],
        "北卡罗来纳州": [],
        "北达科他州": [],
        "俄亥俄州": [],
        "俄克拉荷马州": [],
        "俄勒冈州": [],
        "宾夕法尼亚州": [],
        "罗得岛州": [],
        "南卡罗来纳州": [],
        "南达科他州": [],
        "田纳西州": [],
        "德克萨斯州": [],
        "犹他州": [],
        "佛蒙特州": [],
        "弗吉尼亚州": [],
        "华盛顿州": [],
        "西弗吉尼亚州": [],
        "威斯康星州": [],
        "怀俄明州": [],
        "华盛顿哥伦比亚特区": []
    },
    "澳大利亚": {
        "新南威尔士州": [],
        "维多利亚州": [],
        "昆士兰州": [],
        "西澳大利亚州": [],
        "南澳大利亚州": [],
        "塔斯马尼亚州": [],
        "澳大利亚首都领地": [],
        "北领地": []
    }
};

// 所有国家列表
const allCountries = [
    "中国", "美国", "澳大利亚",
    "阿富汗", "阿尔巴尼亚", "阿尔及利亚", "安道尔", "安哥拉", "安提瓜和巴布达", "阿根廷", "亚美尼亚", "奥地利", "阿塞拜疆",
    "巴哈马", "巴林", "孟加拉国", "巴巴多斯", "白俄罗斯", "比利时", "伯利兹", "贝宁", "不丹", "玻利维亚", "波斯尼亚和黑塞哥维那", "博茨瓦纳", "巴西", "文莱", "保加利亚", "布基纳法索", "布隆迪",
    "柬埔寨", "喀麦隆", "加拿大", "佛得角", "中非共和国", "乍得", "智利", "哥伦比亚", "科摩罗", "刚果", "刚果民主共和国", "哥斯达黎加", "科特迪瓦", "克罗地亚", "古巴", "塞浦路斯", "捷克共和国",
    "丹麦", "吉布提", "多米尼克", "多米尼加共和国",
    "厄瓜多尔", "埃及", "萨尔瓦多", "赤道几内亚", "厄立特里亚", "爱沙尼亚", "埃塞俄比亚",
    "斐济", "芬兰", "法国",
    "加蓬", "冈比亚", "格鲁吉亚", "德国", "加纳", "希腊", "格林纳达", "危地马拉", "几内亚", "几内亚比绍", "圭亚那",
    "海地", "洪都拉斯", "匈牙利",
    "冰岛", "印度", "印度尼西亚", "伊朗", "伊拉克", "爱尔兰", "以色列", "意大利",
    "牙买加", "日本", "约旦",
    "哈萨克斯坦", "肯尼亚", "基里巴斯", "朝鲜", "韩国", "科威特", "吉尔吉斯斯坦",
    "老挝", "拉脱维亚", "黎巴嫩", "莱索托", "利比里亚", "利比亚", "列支敦士登", "立陶宛", "卢森堡",
    "马其顿", "马达加斯加", "马拉维", "马来西亚", "马尔代夫", "马里", "马耳他", "马绍尔群岛", "毛里塔尼亚", "毛里求斯", "墨西哥", "密克罗尼西亚", "摩尔多瓦", "摩纳哥", "蒙古", "黑山", "摩洛哥", "莫桑比克", "缅甸",
    "纳米比亚", "瑙鲁", "尼泊尔", "荷兰", "新西兰", "尼加拉瓜", "尼日尔", "尼日利亚", "挪威",
    "阿曼",
    "巴基斯坦", "帕劳", "巴拿马", "巴布亚新几内亚", "巴拉圭", "秘鲁", "菲律宾", "波兰", "葡萄牙",
    "卡塔尔",
    "罗马尼亚", "俄罗斯", "卢旺达",
    "圣基茨和尼维斯", "圣卢西亚", "圣文森特和格林纳丁斯", "萨摩亚", "圣马力诺", "圣多美和普林西比", "沙特阿拉伯", "塞内加尔", "塞尔维亚", "塞舌尔", "塞拉利昂", "新加坡", "斯洛伐克", "斯洛文尼亚", "所罗门群岛", "索马里", "南非", "南苏丹", "西班牙", "斯里兰卡", "苏丹", "苏里南", "斯威士兰", "瑞典", "瑞士", "叙利亚",
    "塔吉克斯坦", "坦桑尼亚", "泰国", "东帝汶", "多哥", "汤加", "特立尼达和多巴哥", "突尼斯", "土耳其", "土库曼斯坦", "图瓦卢",
    "乌干达", "乌克兰", "阿拉伯联合酋长国", "英国", "乌拉圭", "乌兹别克斯坦",
    "瓦努阿图", "梵蒂冈", "委内瑞拉", "越南",
    "也门",
    "赞比亚", "津巴布韦"
];

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
    // 不再自动加载已有评分，让用户主动选择
}

// 加载所有分类到单个页面
function loadAllCategories() {
    const container = document.querySelector('.assessment-container');
    
    // 计算总项目数
    const allItems = [];
    Object.values(assessmentItems).forEach(categoryData => {
        Object.values(categoryData).forEach(items => {
            items.forEach(item => allItems.push(item));
        });
    });
    
            let html = `
                <div class="all-categories">
                    <h1 class="main-title">性偏好评分表</h1>
                    
                    <!-- 个人信息收集部分 -->
                    <div class="personal-info-section">
                        <h2 class="personal-info-title">个人信息</h2>
                        <div class="personal-info-form">
                            <div class="info-row">
                                <div class="info-item">
                                    <label for="gender">性别：</label>
                                    <select id="gender" onchange="updatePersonalInfo()">
                                        <option value="">请选择</option>
                                        <option value="男">男</option>
                                        <option value="女">女</option>
                                    </select>
                                </div>
                                <div class="info-item">
                                    <label for="age">年龄：</label>
                                    <input type="number" id="age" placeholder="请输入年龄" min="1" max="120" onchange="updatePersonalInfo()">
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item">
                                    <label for="country">国家/地区：</label>
                                    <select id="country" onchange="updateCountry()">
                                        <option value="">请选择国家/地区</option>
                                        ${allCountries.map(country => `<option value="${country}">${country}</option>`).join('')}
                                    </select>
                                </div>
                            </div>
                            <div class="info-row" id="province-row" style="display: none;">
                                <div class="info-item">
                                    <label for="province">省份/州：</label>
                                    <select id="province" onchange="updateProvince()">
                                        <option value="">请选择省份/州</option>
                                    </select>
                                </div>
                            </div>
                            <div class="info-row" id="city-row" style="display: none;">
                                <div class="info-item">
                                    <label for="city">城市：</label>
                                    <select id="city" onchange="updatePersonalInfo()">
                                        <option value="">请选择城市</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
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
                    
                    <div class="top-navigation">
                        <button class="nav-btn save-btn" id="save-btn" onclick="saveProgress()">
                            保存进度
                        </button>
                        <button class="nav-btn reset-btn" id="reset-btn" onclick="resetAllScores()">
                            重置评分
                        </button>
                    </div>
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
                
                <div class="progress-section">
                    <div class="progress-info">
                        <span id="progress-text">评分进度: 0 / ${allItems.length}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
                
                <div class="bottom-navigation">
                    <button class="nav-btn" id="complete-btn" onclick="completeAssessment()">
                        完成评分
                    </button>
                </div>
            `;
    
    container.innerHTML = html;
    
    // 绑定评分按钮事件
    bindScoreButtons();
    
    // 更新进度显示
    updateProgress();
    
            // 重置个人信息表单
            resetPersonalInfo();
            
            // 询问是否要恢复保存的进度
            const savedScores = localStorage.getItem('assessmentScores');
            if (savedScores) {
                if (confirm('检测到您之前保存的评分进度，是否要恢复？\n\n点击"确定"恢复之前的评分\n点击"取消"从空白状态开始')) {
                    loadSavedScores();
                }
            }
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
    // 检查是否所有项目都已评分
    const allItems = [];
    Object.values(assessmentItems).forEach(categoryData => {
        Object.values(categoryData).forEach(items => {
            items.forEach(item => allItems.push(item));
        });
    });
    
    const unratedItems = allItems.filter(item => !assessmentData.scores[item]);
    
    if (unratedItems.length > 0) {
        // 高亮显示未评分的项目
        highlightUnratedItems(unratedItems);
        alert(`请完成所有项目的评分！\n\n还有 ${unratedItems.length} 个项目未评分：\n${unratedItems.slice(0, 5).join('\n')}${unratedItems.length > 5 ? '\n...' : ''}`);
        return;
    }
    
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
    
    // 清除该项目的未评分高亮状态
    itemElement.classList.remove('unrated');
    
    // 保存到本地存储
    localStorage.setItem('assessmentScores', JSON.stringify(assessmentData.scores));
    
    // 更新进度显示
    updateProgress();
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
        
        // 更新进度显示
        updateProgress();
    }
}

// 更新进度显示
function updateProgress() {
    // 计算总项目数
    const allItems = [];
    Object.values(assessmentItems).forEach(categoryData => {
        Object.values(categoryData).forEach(items => {
            items.forEach(item => allItems.push(item));
        });
    });
    
    const ratedCount = Object.keys(assessmentData.scores).length;
    const totalCount = allItems.length;
    const percentage = Math.round((ratedCount / totalCount) * 100);
    
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    const completeBtn = document.getElementById('complete-btn');
    
    if (progressText) {
        progressText.textContent = `评分进度: ${ratedCount} / ${totalCount}`;
    }
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (completeBtn) {
        if (ratedCount === totalCount) {
            completeBtn.textContent = '完成评分 ✓';
            completeBtn.style.background = 'linear-gradient(45deg, #00AA00, #00FF00)';
        } else {
            completeBtn.textContent = '完成评分';
            completeBtn.style.background = 'linear-gradient(45deg, #FFA500, #FF8C00)';
        }
    }
}

// 高亮显示未评分的项目
function highlightUnratedItems(unratedItems) {
    const itemElements = document.querySelectorAll('.item');
    itemElements.forEach(itemElement => {
        const itemName = itemElement.querySelector('.item-name').textContent;
        if (unratedItems.includes(itemName)) {
            itemElement.classList.add('unrated');
        } else {
            itemElement.classList.remove('unrated');
        }
    });
}

// 保存进度
function saveProgress() {
    // 保存当前评分数据到本地存储
    localStorage.setItem('assessmentScores', JSON.stringify(assessmentData.scores));
    
    // 更新保存按钮状态
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.textContent = '已保存 ✓';
        saveBtn.style.background = 'linear-gradient(45deg, #00AA00, #00FF00)';
        
        // 2秒后恢复原状
        setTimeout(() => {
            saveBtn.textContent = '保存进度';
            saveBtn.style.background = 'linear-gradient(45deg, #FFA500, #FF8C00)';
        }, 2000);
    }
    
    // 显示提示信息
    alert('进度已保存！下次进入时会自动恢复您的评分。');
}

// 加载保存的评分
function loadSavedScores() {
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
        
        // 更新进度显示
        updateProgress();
        
        // 显示提示信息
        alert('已恢复您之前保存的评分进度！');
    }
}

// 重置所有评分
function resetAllScores() {
    if (confirm('确定要重置所有评分吗？这将清除您已选择的所有选项。')) {
        // 清空评分数据
        assessmentData.scores = {};
        
        // 清除所有按钮的选中状态
        const scoreButtons = document.querySelectorAll('.score-btn');
        scoreButtons.forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // 清除所有项目的未评分高亮状态
        const itemElements = document.querySelectorAll('.item');
        itemElements.forEach(itemElement => {
            itemElement.classList.remove('unrated');
        });
        
        // 清除本地存储
        localStorage.removeItem('assessmentScores');
        
        // 更新进度显示
        updateProgress();
        
        // 显示提示信息
        alert('所有评分已重置！');
    }
}

// 初始化结果页面
function initResults() {
    const savedScores = localStorage.getItem('assessmentScores');
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    
    if (savedScores) {
        assessmentData.scores = JSON.parse(savedScores);
    }
    
    if (savedPersonalInfo) {
        assessmentData.personalInfo = JSON.parse(savedPersonalInfo);
    }
    
    if (savedScores) {
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
                
                <!-- 个人信息显示 -->
                <div class="personal-info-display">
                    <h2>个人信息</h2>
                    <div class="info-grid">
                        <div class="info-item-display">
                            <span class="info-label">性别：</span>
                            <span class="info-value">${assessmentData.personalInfo.gender || '未填写'}</span>
                        </div>
                        <div class="info-item-display">
                            <span class="info-label">年龄：</span>
                            <span class="info-value">${assessmentData.personalInfo.age || '未填写'}</span>
                        </div>
                        <div class="info-item-display">
                            <span class="info-label">国家/地区：</span>
                            <span class="info-value">${assessmentData.personalInfo.country || '未填写'}</span>
                        </div>
                        <div class="info-item-display">
                            <span class="info-label">省份/州：</span>
                            <span class="info-value">${assessmentData.personalInfo.province || '未填写'}</span>
                        </div>
                        <div class="info-item-display">
                            <span class="info-label">城市：</span>
                            <span class="info-value">${assessmentData.personalInfo.city || '未填写'}</span>
                        </div>
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

// 更新个人信息
function updatePersonalInfo() {
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;
    const province = document.getElementById('province').value;
    const city = document.getElementById('city').value;
    
    assessmentData.personalInfo = {
        gender: gender,
        age: age,
        country: country,
        province: province,
        city: city
    };
    
    // 保存到本地存储
    localStorage.setItem('assessmentScores', JSON.stringify(assessmentData.scores));
    localStorage.setItem('personalInfo', JSON.stringify(assessmentData.personalInfo));
}

// 保存当前评分
function saveCurrentProgress() {
    // 验证个人信息是否完整
    if (!validatePersonalInfo()) {
        return;
    }
    
    // 更新个人信息数据
    updatePersonalInfo();
    
    // 保存到本地存储
    localStorage.setItem('assessmentScores', JSON.stringify(assessmentData.scores));
    localStorage.setItem('personalInfo', JSON.stringify(assessmentData.personalInfo));
    
    alert('评分和个人信息已保存！');
}

// 更新国家选择
function updateCountry() {
    const country = document.getElementById('country').value;
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const provinceRow = document.getElementById('province-row');
    const cityRow = document.getElementById('city-row');
    
    // 清空省份和城市选择
    provinceSelect.innerHTML = '<option value="">请选择省份/州</option>';
    citySelect.innerHTML = '<option value="">请选择城市</option>';
    
    if (country === '中国' || country === '美国' || country === '澳大利亚') {
        // 显示省份/州选择
        provinceRow.style.display = 'flex';
        cityRow.style.display = 'none';
        
        // 填充省份/州选项
        const provinces = Object.keys(regionData[country]);
        provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        });
    } else {
        // 隐藏省份和城市选择
        provinceRow.style.display = 'none';
        cityRow.style.display = 'none';
    }
    
    updatePersonalInfo();
}

// 更新省份选择
function updateProvince() {
    const country = document.getElementById('country').value;
    const province = document.getElementById('province').value;
    const citySelect = document.getElementById('city');
    const cityRow = document.getElementById('city-row');
    
    // 清空城市选择
    citySelect.innerHTML = '<option value="">请选择城市</option>';
    
    if (country === '中国' && province && regionData[country][province]) {
        // 显示城市选择
        cityRow.style.display = 'flex';
        
        // 填充城市选项
        const cities = regionData[country][province];
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        // 美国、澳大利亚或其他国家不需要城市选择
        cityRow.style.display = 'none';
    }
    
    updatePersonalInfo();
}

// 重置个人信息表单
function resetPersonalInfo() {
    // 重置数据
    assessmentData.personalInfo = {
        gender: '',
        age: '',
        country: '',
        province: '',
        city: ''
    };
    
    // 重置表单
    const genderSelect = document.getElementById('gender');
    const ageInput = document.getElementById('age');
    const countrySelect = document.getElementById('country');
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const provinceRow = document.getElementById('province-row');
    const cityRow = document.getElementById('city-row');
    
    if (genderSelect) genderSelect.value = '';
    if (ageInput) ageInput.value = '';
    if (countrySelect) countrySelect.value = '';
    if (provinceSelect) provinceSelect.innerHTML = '<option value="">请选择省份/州</option>';
    if (citySelect) citySelect.innerHTML = '<option value="">请选择城市</option>';
    if (provinceRow) provinceRow.style.display = 'none';
    if (cityRow) cityRow.style.display = 'none';
}

// 验证个人信息是否完整
function validatePersonalInfo() {
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const country = document.getElementById('country').value;
    
    if (!gender) {
        alert('请选择性别');
        return false;
    }
    
    if (!age) {
        alert('请输入年龄');
        return false;
    }
    
    if (!country) {
        alert('请选择国家/地区');
        return false;
    }
    
    // 如果选择了中国、美国、澳大利亚，需要验证省份/州
    if (country === '中国' || country === '美国' || country === '澳大利亚') {
        const province = document.getElementById('province').value;
        if (!province) {
            alert('请选择省份/州');
            return false;
        }
        
        // 如果选择了中国，需要验证城市
        if (country === '中国') {
            const city = document.getElementById('city').value;
            if (!city) {
                alert('请选择城市');
                return false;
            }
        }
    }
    
    return true;
}

// 开始新的评分
function startNewAssessment() {
    if (confirm('确定要开始新的评分吗？当前评分将被清除。')) {
        localStorage.removeItem('assessmentScores');
        localStorage.removeItem('personalInfo');
        window.location.href = 'assessment.html';
    }
}

// 返回首页
function goHome() {
    window.location.href = 'index.html';
}