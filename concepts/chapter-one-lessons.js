const chapterOneLessons = {
  'sequence-limit': {
    number: '1.2', title: '数列的极限', node: 'sequence-limit', hours: '1–2 课时',
    deck: '极限不是“算到无穷远”，而是说明：无论要求多高的精度，从某一项以后，所有项都能稳定地满足要求。',
    questions: ['无限过程永远没有最后一项，我们凭什么说它有一个确定结果？', '数列越来越靠近某个数，怎样排除它偶尔又跑远？', '“看起来接近”和“可以控制误差”之间差了什么？'],
    history: String.raw`<p>古希腊的芝诺悖论已经暴露了无限过程的困难：把路程不断分割，步骤似乎永远做不完。17 世纪微积分用无穷过程成功计算面积、切线和速度，但“最后究竟到了哪里”常由几何直觉担保。</p><p>19 世纪，柯西把收敛数列放到分析学的中心；后来逐步成熟的量词语言把直觉改写成可检验的误差承诺。今天常用的 $\varepsilon$–$N$ 定义不应简单归功于某一个人，它是分析严格化长期演变的结果。</p><div class="history-note"><strong>历史为什么重要</strong>严格定义不是为了把简单事情说复杂，而是为了处理图像看不清、公式很复杂、甚至只有算法生成的数列。</div>`,
    definition: String.raw`<div class="definition"><span class="definition-label">现代定义</span><p>若对任意 $\varepsilon>0$，都存在正整数 $N$，使得当 $n>N$ 时恒有 $|a_n-L|<\varepsilon$，就称数列 $\{a_n\}$ 收敛于 $L$，记作 $\lim_{n\to\infty}a_n=L$。</p></div><p>定义的顺序不能交换：精度 $\varepsilon$ 由检验者任意提出，阈值 $N$ 才可以根据精度选择；并且 $n>N$ 后的<strong>所有项</strong>都必须进入误差带。</p><p class="idea-line">极限描述的不是“某一项离 $L$ 很近”，而是尾部整体最终被困在 $L$ 的任意小邻域中。</p>`,
    examples: String.raw`<div class="example"><strong>例 1：$a_n=1/n\to0$</strong><p>给定 $\varepsilon>0$，只需选 $N>1/\varepsilon$。于是 $n>N$ 时 $|1/n|<\varepsilon$。这就是把“分母越来越大”翻译成可执行的误差控制。</p></div><div class="example"><strong>反例：$(-1)^n$</strong><p>它始终有界，却在 $-1$ 与 $1$ 之间跳动。只要取 $\varepsilon<1$，不可能找到一个中心和一条最终容纳全部尾项的误差带。</p></div><div class="example"><strong>易混点：有界不等于收敛</strong><p>收敛数列一定有界；有界数列未必收敛。后面“单调有界准则”还需要加上单调性。</p></div>`,
    uses: '<ul><li><strong>理论内部：</strong>函数极限、级数和数值分析都以数列收敛为基础。</li><li><strong>计算与工程：</strong>迭代法产生一串近似值，停止条件本质上是在控制尾部误差。</li><li><strong>AI：</strong>优化算法讨论损失值、参数或梯度是否收敛；“训练轮数很多”本身不是收敛证明。</li></ul>',
    checks: [String.raw`用定义证明 $3/n\to0$，明确写出 $N$ 如何依赖 $\varepsilon$。`,'举出一个有界但不收敛的数列，以及一个收敛但不单调的数列。','为什么只检查很多项“看起来稳定”不能代替收敛证明？',String.raw`若把定义中的“对任意 $\varepsilon>0$”改成“存在一个 $\varepsilon>0$”，会弱到什么程度？`]
  },
  'function-limit': {
    number: '1.3', title: '函数的极限', node: 'function-limit', hours: '2 课时',
    deck: '函数极限研究的是输入靠近某处时输出的趋势；它有意忽略那个点本身，因为局部趋势不应被一个孤立取值绑架。',
    questions: ['函数在一点没有定义，为什么仍然可能有极限？','“无限接近”如何变成关于距离的精确命题？','左右两边的趋势不同，能不能仍说极限存在？'],
    history: String.raw`<p>切线斜率与瞬时速度都要求考察“越来越短的区间”。牛顿、莱布尼茨时期主要依赖运动和几何直觉；当傅里叶级数、分段函数等对象进入分析，直觉不再足以判断每个局部行为。</p><p>柯西系统使用变量趋近的语言，19 世纪后期的分析严格化进一步突出 $\varepsilon$–$\delta$ 结构：不再说“无限小”，而是对任意输出误差，反向给出输入必须靠多近。</p>`,
    definition: String.raw`<div class="definition"><span class="definition-label">$x\to a$ 时的有限极限</span><p>若对任意 $\varepsilon>0$，存在 $\delta>0$，使得当 $0<|x-a|<\delta$ 时都有 $|f(x)-L|<\varepsilon$，则称 $\lim_{x\to a}f(x)=L$。</p></div><p>$0<|x-a|$ 排除了 $x=a$。因此极限只读“附近”的信息，$f(a)$ 可以等于 $L$、不等于 $L$，甚至没有定义。</p><p class="idea-line">$\varepsilon$ 是输出允许的误差，$\delta$ 是为了兑现这个误差而对输入提出的要求。</p>`,
    examples: String.raw`<div class="example"><strong>可去的洞</strong><p>令 $f(x)=(x^2-1)/(x-1)$（$x\ne1$）。约去公因子后附近行为是 $x+1$，所以 $\lim_{x\to1}f(x)=2$，尽管 $f(1)$ 没定义。</p></div><div class="example"><strong>左右极限不同</strong><p>符号函数在 $0$ 左侧趋于 $-1$，右侧趋于 $1$，所以双侧极限不存在。双侧极限存在当且仅当左右极限存在且相等。</p></div><div class="example"><strong>不要用代入法定义极限</strong><p>直接代入只是连续函数上的快捷计算。出现 $0/0$ 时，它告诉我们“现有表达式不能直接判断”，并不等于极限不存在。</p></div>`,
    uses: '<ul><li><strong>理论内部：</strong>连续、导数、积分和级数的严格语言都从极限生长出来。</li><li><strong>科学计算：</strong>离散网格逐渐加密时，数值解是否逼近连续模型，需要极限来表达。</li><li><strong>AI：</strong>小扰动下模型输出的变化、梯度定义和近似误差，都以局部极限为基础。</li></ul>',
    checks: ['构造两个函数，它们在 $a$ 附近完全相同但在 $a$ 处取值不同。说明它们为何有相同极限。','分别判断 $|x|/x$ 在 $0$ 的左右极限和双侧极限。',String.raw`用 $\varepsilon$–$\delta$ 定义证明 $\lim_{x\to2}(3x-1)=5$。`,'解释“极限存在”“函数在该点有定义”“函数在该点连续”三者的关系。']
  },
  'infinitesimal-infinite': {
    number: '1.4', title: '无穷小与无穷大', node: 'infinitesimal-infinite', hours: '1 课时',
    deck: '无穷小和无穷大不是两类神秘数字，而是变量在一个极限过程中的行为标签。',
    questions: ['无穷小是不是“比任何正数都小但又不等于零”的实数？','无穷大能不能像普通数一样参与四则运算？','为什么研究趋于零的量，反而能简化复杂变化？'],
    history: String.raw`<p>莱布尼茨的微分记号把“极小增量”变成强大的计算语言，但早期无穷小究竟是什么长期受到质疑。贝克莱曾批评它们是“消失量的幽灵”，矛头指向当时论证中时而非零、时而又被舍去的做法。</p><p>19 世纪分析学用极限重新组织这套语言：无穷小说的是变量趋于零，无穷大说的是变量最终超过任意预设界限。现代也有严格的非标准分析重新赋予无穷小数以意义，但这不是同济高数采用的框架。</p>`,
    definition: String.raw`<div class="definition"><span class="definition-label">两个过程性定义</span><p>若在给定趋近过程中 $\alpha\to0$，则称 $\alpha$ 为无穷小；若对任意 $M>0$，变量最终都满足 $|u|>M$，则称 $u$ 为无穷大。</p></div><p>常数 $0$ 是无穷小；任何固定的非零实数都不是无穷小。符号 $\infty$ 不是实数，所以 $\infty-\infty$、$0\cdot\infty$ 等不是普通算术，而是不定型提示。</p><p class="idea-line">名称属于“变量 + 趋近过程”的组合；脱离过程问一个式子是不是无穷小，问题往往不完整。</p>`,
    examples: String.raw`<div class="example"><strong>互为倒数的关系</strong><p>若 $\alpha\ne0$ 且 $\alpha\to0$，则 $1/|\alpha|\to\infty$；反过来，若 $|u|\to\infty$，则 $1/u\to0$。必须保留“非零”和“绝对值/符号”条件。</p></div><div class="example"><strong>趋于零不等于已经为零</strong><p>$1/n$ 的每一项都不为零，但它的极限为零。极限陈述不能把过程中的量直接替换成最终极限后继续做除法。</p></div><div class="example"><strong>无界不一定趋于无穷</strong><p>数列 $0,1,0,2,0,3,\ldots$ 无界，却没有最终超过每个 $M$，因为它反复回到 $0$。</p></div>`,
    uses: String.raw`<ul><li><strong>理论内部：</strong>把 $f(x)\to A$ 改写为 $f(x)-A\to0$，常能把一般极限转化为无穷小问题。</li><li><strong>工程：</strong>截断误差、测量误差和网格尺度都用趋零量描述。</li><li><strong>计算机科学：</strong>渐近分析关心输入增大时增长尺度；但 Big-O 与“无穷大”不是同一个定义。</li></ul>`,
    checks: ['判断：一个无穷小量一定永远小于 $10^{-100}$ 吗？为什么？','给出一个无界但不趋于正无穷的数列。',String.raw`说明 $1/x\to0$ 在 $x\to+\infty$ 和 $x\to-\infty$ 时的共同点与符号差异。`,String.raw`为什么不能把 $0\cdot\infty$ 直接算成 $0$？`]
  },
  'limit-laws': {
    number: '1.5', title: '极限运算法则', node: 'limit-laws', hours: '1–2 课时',
    deck: '运算法则把复杂极限拆开，但每一条法则都是有条件的许可证，不是无条件的符号搬运。',
    questions: ['为什么极限通常能穿过加法和乘法？','商的极限为什么必须要求分母极限非零？','出现 $0/0$ 时，到底是答案为零，还是信息不足？'],
    history: '<p>早期微积分的成功很大程度来自熟练的代数操作，但若不说明何时允许把极限与运算交换，就可能从正确公式推出错误结论。分析严格化的重要工作之一，就是把这些熟练操作还原为定理，并逐项写清前提。</p><p>运算法则的证明体现一种通用策略：把整体误差拆成若干局部误差，再利用趋近过程中的有界性控制乘积项。这种“误差预算”思想会贯穿数值分析、概率论和机器学习理论。</p>',
    definition: String.raw`<div class="definition"><span class="definition-label">基本法则</span><p>若 $f\to A$、$g\to B$，则 $f\pm g\to A\pm B$，$fg\to AB$；若另有 $B\ne0$，则 $f/g\to A/B$。</p></div><p>商法则的 $B\ne0$ 不是装饰。它保证趋近过程中分母最终远离零，从而倒数保持受控。</p><div class="formula-block">$$fg-AB=f(g-B)+B(f-A)$$</div><p>这个恒等式展示了乘法法则的误差如何拆分。由于 $f\to A$，$f$ 在附近有界，两项都能被分别压小。</p>`,
    examples: String.raw`<div class="example"><strong>法则可直接使用</strong><p>若 $x\to2$，多项式 $x^3-2x+1$ 的极限可逐层拆解为 $8-4+1=5$。</p></div><div class="example"><strong>$0/0$ 是不定型</strong><p>当 $x\to0$ 时，$x/x\to1$，$x^2/x\to0$，$x/x^2$ 无界。同样的“$0/0$ 外观”可以产生完全不同的结果。</p></div><div class="example"><strong>存在性不能倒推</strong><p>$f+g$ 有极限，并不能保证 $f$、$g$ 各自有极限。例如 $f(x)=\sin(1/x)$，$g(x)=-f(x)$。</p></div>`,
    uses: '<ul><li><strong>理论内部：</strong>多项式、有理函数及连续函数运算的极限计算由此模块化。</li><li><strong>数值计算：</strong>误差如何经过加、乘、除传播，决定算法是否稳定。</li><li><strong>AI：</strong>复杂计算图由简单运算复合；局部稳定性需要每个运算节点的条件都成立。</li></ul>',
    checks: ['说明商法则中分母极限非零为什么能保证分母最终不为零。','分别举例说明 $0/0$ 可以得到有限值、零和无穷大。',String.raw`若 $f\to2$，证明 $f$ 在充分靠近目标点时有界。`,'解释“先拆开再求极限”在哪些情况下可能是非法操作。']
  },
  'limit-criteria': {
    number: '1.6', title: '极限存在准则与两个重要极限', node: 'limit-criteria', hours: '2 课时',
    deck: '当答案还算不出来时，先证明答案存在。夹逼与单调有界性把“求值”和“存在性”这两个问题分开。',
    questions: ['不知道极限候选值时，怎样证明它确实存在？','为什么上下两个函数夹向同一值，中间函数无处可逃？','圆周率、复利和自然常数 $e$ 为什么会出现在极限里？'],
    history: String.raw`<p>阿基米德用内接、外切多边形夹逼圆的面积，是夹逼思想的古老原型。17 世纪以后，复利问题产生了数列 $(1+1/n)^n$：计息越频繁，收益越来越大，却不会无限增长，这推动人们认识自然常数 $e$。</p><p>单调有界准则背后不是一个计算技巧，而是实数完备性：实数轴没有“缺口”，所以单调且被界住的数列一定有落脚点。</p>`,
    definition: String.raw`<div class="definition"><span class="definition-label">两类存在性准则</span><p>夹逼准则：若 $g\le f\le h$ 且 $g,h$ 趋于同一极限 $L$，则 $f\to L$。单调有界准则：单调且有界的数列必收敛。</p></div><div class="formula-block">$$\lim_{x\to0}\frac{\sin x}{x}=1,\qquad \lim_{x\to0}(1+x)^{1/x}=e$$</div><p>第一个极限来自单位圆中的几何不等式，角度必须用弧度；第二个极限与复利和指数增长相连。不同教材也常用等价的数列形式 $\lim_{n\to\infty}(1+1/n)^n=e$。</p>`,
    examples: String.raw`<div class="example"><strong>夹逼 $x\sin(1/x)$</strong><p>因为 $-|x|\le x\sin(1/x)\le|x|$，两端在 $x\to0$ 时都趋于 $0$，所以中间虽然无限振荡，仍趋于 $0$。</p></div><div class="example"><strong>条件缺一不可</strong><p>$(-1)^n$ 有界但不单调；$n$ 单调但无上界。二者都不收敛于有限实数。</p></div><div class="example"><strong>重要极限不是代入公式</strong><p>使用前必须把变量和结构整理到相应形式，并检查趋近方向与定义域。例如 $(1+u)^{1/u}$ 需要 $u\to0$ 且底数在实数范围内有定义。</p></div>`,
    uses: '<ul><li><strong>理论内部：</strong>三角函数求导、指数函数和自然对数的建立依赖重要极限。</li><li><strong>金融与增长模型：</strong>连续复利把离散计息推到极限，产生 $e^{rt}$。</li><li><strong>算法：</strong>单调下降且有下界常用于证明损失值收敛，但不自动保证参数收敛或到达全局最优。</li></ul>',
    checks: [String.raw`用夹逼准则求 $\lim_{x\to0}x^2\cos(1/x)$。`,'解释为什么“单调”与“有界”在收敛准则中缺一不可。',String.raw`为什么 $\sin x/x$ 的 $x$ 必须用弧度制？`,'连续复利中的 $e$ 是如何从有限次复利的极限出现的？']
  },
  'infinitesimal-comparison': {
    number: '1.7', title: '无穷小的比较', node: 'infinitesimal-comparison', hours: '1 课时',
    deck: '都趋于零并不意味着同样小。比较无穷小是在建立局部尺度：谁是主导项，谁可以在一阶近似中忽略。',
    questions: [String.raw`$x$、$x^2$ 和 $\sin x$ 都趋于零，它们对误差的贡献相同吗？`,'“等价”为什么只与某个趋近过程相联系？','等价无穷小为什么不能在加减式中随意替换？'],
    history: '<p>微积分早期常把“高阶小量”直接舍去，这在计算上非常有效，却需要回答：何谓高阶？何时舍去不会改变主要结果？极限比值把这种经验变成了可检验的尺度关系。</p><p>后来渐近分析把这一思想推广到函数、积分、微分方程和算法复杂度：先抓住主导项，再逐层追踪更细的修正。</p>',
    definition: String.raw`<div class="definition"><span class="definition-label">用比值比较尺度</span><p>设 $\alpha,\beta\to0$。若 $\alpha/\beta\to0$，称 $\alpha$ 是 $\beta$ 的高阶无穷小；若比值趋于非零常数，称二者同阶；若比值趋于 $1$，记作 $\alpha\sim\beta$。</p></div><div class="formula-block">$$\sin x\sim x,\quad \tan x\sim x,\quad 1-\cos x\sim\frac{x^2}{2}\qquad(x\to0)$$</div><p>“等价”不是处处相等，而是相对误差趋于零：$\alpha=\beta(1+o(1))$。</p>`,
    examples: String.raw`<div class="example"><strong>乘除结构中的替换</strong><p>$\lim_{x\to0}\sin x/x=1$ 可直接由 $\sin x\sim x$ 得到。</p></div><div class="example"><strong>加减结构中的陷阱</strong><p>虽然 $\sin x\sim x$，但在 $x-\sin x$ 中直接替换会得到 $0$，丢失真正的三阶主导项 $x^3/6$。</p></div><div class="example"><strong>过程不能省略</strong><p>$1-\cos x\sim x^2/2$ 只在 $x\to0$ 时成立；把它当作全局恒等式会产生明显错误。</p></div>`,
    uses: '<ul><li><strong>理论内部：</strong>泰勒公式把“主导项 + 高阶余项”的思想系统化。</li><li><strong>物理与工程：</strong>小角度近似、线性响应和微扰方法都依赖尺度判断。</li><li><strong>算法：</strong>时间复杂度比较关注输入增大时的主导增长项，与这里的渐近思想同源，但符号体系不同。</li></ul>',
    checks: [String.raw`判断 $x^3$ 相对于 $x^2$ 在 $x\to0$ 时的阶。`,String.raw`用等价无穷小计算 $\lim_{x\to0}\tan(3x)/\sin(2x)$。`,String.raw`解释为什么 $x-\sin x$ 中不能直接用 $\sin x\sim x$。`,'把“相对误差趋于零”写成一个极限公式。']
  },
  continuity: {
    number: '1.8', title: '函数的连续性与间断点', node: 'continuity', hours: '2 课时',
    deck: '连续性把“附近的趋势”与“这一点的实际取值”接起来；间断点分类则研究这种连接究竟以哪一种方式失败。',
    questions: ['“图像一笔画成”为什么不是足够精确的定义？','极限存在但函数值不对，算不算连续？','可去、跳跃、无穷和振荡间断的区别在哪里？'],
    history: '<p>早期数学家常把连续函数理解为由一个表达式给出的平滑曲线。傅里叶级数和分段函数迫使人们区分“公式形式”“连续性”和“可导性”。柯西给出以极限为核心的连续性表述，随后量词语言使其更加严格。</p><p>连续并不等于光滑。$|x|$ 在 $0$ 连续却不可导；ReLU 函数也是如此。反过来，狄利克雷函数虽是函数，却处处不连续。</p>',
    definition: String.raw`<div class="definition"><span class="definition-label">连续的三个条件</span><p>$f$ 在 $a$ 连续，当且仅当 $f(a)$ 有定义、$\lim_{x\to a}f(x)$ 存在，并且 $\lim_{x\to a}f(x)=f(a)$。</p></div><p>若任一条件失败，$a$ 就是间断点。先看左右极限：两侧有限且相等但与函数值不合，是可去间断；两侧有限但不相等，是跳跃间断；出现无界或无极限振荡，则属于更强的失败。</p><p class="idea-line">连续性是一种局部稳定承诺：输入足够接近，输出就能被保证足够接近。</p>`,
    examples: String.raw`<div class="example"><strong>可去间断</strong><p>$(x^2-1)/(x-1)$ 在 $x=1$ 的极限为 $2$。把函数值补成 $2$ 就可连续延拓。</p></div><div class="example"><strong>跳跃间断</strong><p>取整函数在整数处左右极限不同，改变单点函数值无法消除跳跃。</p></div><div class="example"><strong>振荡间断</strong><p>$\sin(1/x)$ 在 $x\to0$ 时无限振荡，没有一个确定极限；它有界，但有界不能保证极限存在。</p></div><div class="example"><strong>连续但不可导</strong><p>$|x|$ 在 $0$ 的左右极限都等于函数值 $0$，所以连续；但左右斜率分别为 $-1$ 和 $1$。</p></div>`,
    uses: '<ul><li><strong>理论内部：</strong>连续性把局部极限传递到函数值，为零点、最值和积分理论提供入口。</li><li><strong>工程：</strong>跳跃可表示开关、冲击和相变；分类决定应当补值、分段还是更换模型。</li><li><strong>AI：</strong>ReLU 连续但不光滑，便于分段线性计算；模型鲁棒性则要求更强的定量稳定条件。</li></ul>',
    checks: ['给分段函数选择一个参数，使它在分界点连续。','分别说明可去间断和跳跃间断能否通过改变单点函数值修复。','构造一个连续但不可导的函数。','为什么“图像没有断开”在高维、抽象空间或没有图像时不够用？']
  },
  'elementary-continuity': {
    number: '1.9', title: '连续函数的运算与初等函数', node: 'elementary-continuity', hours: '1 课时',
    deck: '连续性真正强大的地方在于可复用：验证少数基本函数，再用四则运算、复合和反函数构造出整个初等函数世界。',
    questions: [String.raw`为什么不必对每个复杂函数重新做一次 $\varepsilon$–$\delta$ 证明？`,'复合函数连续时，内层和外层分别要在哪里连续？','“初等函数连续”为什么必须带上“在其定义域内”？'],
    history: '<p>欧拉时代的分析学围绕初等函数展开。19 世纪以后，函数不再等同于一个解析式，于是需要反过来证明：我们熟悉的多项式、指数、对数和三角函数确实拥有连续性。</p><p>结构化证明的价值在于复用。证明加法、乘法、复合等操作保持连续后，复杂表达式可以像程序一样逐层验证，而不必每次从定义重新开始。</p>',
    definition: String.raw`<div class="definition"><span class="definition-label">连续性的封闭性</span><p>若 $f,g$ 在 $a$ 连续，则 $f\pm g$、$fg$ 在 $a$ 连续；当 $g(a)\ne0$ 时 $f/g$ 连续。若 $g$ 在 $a$ 连续且 $f$ 在 $g(a)$ 连续，则 $f\circ g$ 在 $a$ 连续。</p></div><p>多项式在全体实数上连续；有理函数在分母非零处连续；指数、对数、三角函数和反三角函数都只在各自定义域或定义区间内讨论连续性。</p><div class="formula-block">$$\lim_{x\to a}f(g(x))=f\!\left(\lim_{x\to a}g(x)\right)=f(g(a))$$</div><p>这个熟悉的“把极限送进函数”是连续性的结论，不是所有函数都自动拥有的规则。</p>`,
    examples: String.raw`<div class="example"><strong>逐层读取定义域</strong><p>$\ln(1-x^2)$ 只有在 $1-x^2>0$，即 $-1<x<1$ 时有定义，并在这个区间连续。</p></div><div class="example"><strong>分母条件</strong><p>$1/(x-2)$ 在其定义域上连续，但不能说它在整个实数轴上连续。</p></div><div class="example"><strong>复合计算图</strong><p>$\sin(e^{x^2})$ 由平方、指数和正弦逐层复合；每层在相关点连续，所以整体连续。</p></div>`,
    uses: '<ul><li><strong>理论内部：</strong>把连续性证明从逐点苦算变成结构复用，并为反函数连续性提供条件。</li><li><strong>软件与建模：</strong>复杂模型由模块组合；检查定义域相当于检查接口契约。</li><li><strong>AI：</strong>神经网络是仿射变换与激活函数的复合；各层连续则整体连续，但鲁棒性还需要 Lipschitz 常数等定量信息。</li></ul>',
    checks: [String.raw`写出 $\sqrt{\ln x}$ 的定义域，并说明它在哪些点连续。`,String.raw`说明 $\tan x$ 为什么不能笼统地说在 $\mathbb R$ 上连续。`,String.raw`把 $\sin(e^{x^2})$ 拆成基本函数的复合。`,'“可把极限直接代入函数”需要什么前提？']
  },
  'closed-interval-theorems': {
    number: '1.10', title: '闭区间上连续函数的性质', node: 'closed-interval-theorems', hours: '2 课时',
    deck: '连续性是局部条件，闭区间提供整体边界；二者结合，才得到有界、取到最值和覆盖中间值的可靠保证。',
    questions: ['函数有上界，为什么不一定真的取得最大值？','定理为什么坚持使用闭区间，而不是任意区间？','端点异号为什么能保证中间至少有一个零点？'],
    history: '<p>求最大最小值和方程的根是微积分诞生前就存在的问题。随着连续概念严格化，Bolzano 的零点思想与后来完整的介值定理表明：连续曲线不能从负值跳到正值而绕过零。</p><p>极值定理通常与 Weierstrass 的分析严格化联系在一起。现代观点用“紧致性”统一解释闭区间的作用：在实数中，闭且有界的区间不会让极值从边界逃走，也不会让逼近序列缺少收敛子列。</p>',
    definition: String.raw`<div class="definition"><span class="definition-label">闭区间上的三个保证</span><p>若 $f$ 在 $[a,b]$ 上连续，则它在该区间有界，并且能取得最大值和最小值；此外，它会取得端点函数值之间的每一个中间值。特别地，若 $f(a)f(b)<0$，则存在 $c\in(a,b)$ 使 $f(c)=0$。</p></div><p>“有上界”和“取得最大值”不同。开区间上的 $f(x)=x$ 有上界 $1$，却在 $(0,1)$ 内取不到 $1$。</p><p class="idea-line">连续阻止函数跳过目标值；闭区间阻止候选点逃到区间之外。</p>`,
    examples: String.raw`<div class="example"><strong>二分法为何可靠</strong><p>若连续函数在区间两端异号，就保留仍异号的那一半区间。区间长度不断减半，零点被持续夹住。</p></div><div class="example"><strong>去掉闭区间</strong><p>$f(x)=1/x$ 在 $(0,1]$ 连续却无界；问题出在 $0$ 未包含而函数可向那里发散。</p></div><div class="example"><strong>去掉连续性</strong><p>跳跃函数可以在端点异号时直接从负值跳到正值，而从未取到 $0$。</p></div><div class="example"><strong>存在不等于唯一</strong><p>零点定理保证至少一个零点；要证明唯一，还需要单调性等额外条件。</p></div>`,
    uses: '<ul><li><strong>理论内部：</strong>最值、零点和介值定理是导数应用、积分和方程理论的重要保证。</li><li><strong>工程优化：</strong>在封闭可行范围内，连续目标函数能取得最优值，这是“最优方案存在”的第一层理论。</li><li><strong>数值算法：</strong>二分法依赖连续和异号条件；它收敛稳健，但速度和唯一性需要另行分析。</li></ul>',
    checks: ['分别举例说明去掉“闭区间”和去掉“连续”会使最值定理失败。','端点异号是零点存在的充分条件还是必要条件？','为什么零点定理不能保证零点唯一？','解释闭区间在最优化和安全边界问题中的意义。']
  }
};

const lessonOrder = [
  ['function-mapping.html', '1.1 映射与函数'],
  ['sequence-limit.html', '1.2 数列的极限'],
  ['function-limit.html', '1.3 函数的极限'],
  ['infinitesimal-infinite.html', '1.4 无穷小与无穷大'],
  ['limit-laws.html', '1.5 极限运算法则'],
  ['limit-criteria.html', '1.6 极限存在准则'],
  ['infinitesimal-comparison.html', '1.7 无穷小的比较'],
  ['continuity-discontinuity.html', '1.8 连续性与间断点'],
  ['elementary-continuity.html', '1.9 初等函数的连续性'],
  ['closed-interval-theorems.html', '1.10 闭区间上的性质']
];

const nav = `<header class="site-header"><a class="site-name" href="../index.html">CalculusStory</a><nav class="unified-nav" aria-label="主导航"><a class="active" href="../index.html#chapters">章节</a><a href="../index.html#method">学习方法</a><a href="../graph.html">知识图谱</a><a href="../people.html">数学家</a><a href="../exercises.html">习题</a><a href="../timeline.html">时间线</a><a href="../formalization.html">Lean4</a><a href="../ai.html">AI 辅助</a><a href="https://github.com/Spring-1211/CalculusStory">GitHub</a></nav></header>`;

function renderLessonMath() {
  if (!window.renderMathInElement) return;
  renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false});
}

function renderChapterLesson() {
  const id = document.body.dataset.lesson;
  const lesson = chapterOneLessons[id];
  const root = document.querySelector('#lesson-root');
  if (!lesson) { root.innerHTML = '<p class="error-box">没有找到这一节讲义。</p>'; return; }
  const orderIndex = lessonOrder.findIndex(([file]) => location.pathname.endsWith(file));
  const previous = orderIndex > 0 ? lessonOrder[orderIndex - 1] : null;
  const next = orderIndex < lessonOrder.length - 1 ? lessonOrder[orderIndex + 1] : null;
  const checks = lesson.checks.map((item) => `<li>${item}</li>`).join('');
  document.title = `${lesson.number} ${lesson.title}｜CalculusStory`;
  document.body.insertAdjacentHTML('afterbegin', nav);
  root.className = 'lesson-shell';
  root.innerHTML = `<aside class="lesson-toc" aria-label="本节目录"><a href="../index.html#chapter-1">← 返回第一章目录</a><p>本节结构</p><ol><li><a href="#questions">问题入口</a></li><li><a href="#history">历史与动机</a></li><li><a href="#definition">现代定义</a></li><li><a href="#examples">例子与反例</a></li><li><a href="#uses">用途与迁移</a></li><li><a href="#check">理解检查</a></li></ol></aside><article class="lesson-article"><div class="lesson-meta"><span>上册 · 第一章 · 第 ${lesson.number.split('.')[1]} 节</span><span>对应同济《高等数学》第八版</span><span>建议：${lesson.hours}</span></div><h1>${lesson.title}</h1><p class="lesson-deck">${lesson.deck}</p><div class="textbook-note"><strong>怎样配合教材</strong>先用本页建立问题意识和概念结构，再回到教材学习定理证明与计算方法。公式是解决问题的工具，不是思考的起点。</div><div class="lesson-process"><span>五步理解</span><p>动机 → 直觉漏洞 → 严格定义 → 几何直观 → 边界测试</p></div><section id="questions"><h2>一、从自然问题开始</h2><ol class="opening-questions">${lesson.questions.map((q) => `<li>${q}</li>`).join('')}</ol></section><section id="history"><h2>二、历史与动机：为什么需要它？</h2>${lesson.history}</section><section id="definition"><h2>三、现代定义：每个条件保护什么？</h2>${lesson.definition}</section><section id="examples"><h2>四、例子与反例：看清边界</h2>${lesson.examples}</section><section id="uses"><h2>五、它会在哪里继续工作？</h2>${lesson.uses}</section><section id="check"><h2>六、理解检查与双复盘</h2><ol class="check-list">${checks}</ol><div class="review-prompts"><strong>溯源三问</strong><span>它要解决什么问题？不这样定义会卡在哪里？定义保留和舍弃了什么？</span><strong>批判三问</strong><span>结论需要哪些条件？能否构造反例？这个思想还能迁移到哪里？</span></div></section><section class="references"><h2>参考与延伸</h2><ul><li>同济大学数学科学学院：《高等数学》第八版上册，第一章对应小节。</li><li>本页历史叙述只保留理解概念所需的主线，不以“第一发明者”式简化代替史实。</li><li><a href="../knowledge.html?id=${lesson.node}">查看知识点依赖、人物、习题与形式化映射</a>。</li></ul></section><div class="lesson-next">${previous ? `<a href="${previous[0]}">← ${previous[1]}</a>` : '<a href="../index.html#chapter-1">← 第一章目录</a>'}${next ? `<a href="${next[0]}">${next[1]} →</a>` : `<a href="../ai.html?id=${lesson.node}">用提示词继续追问 →</a>`}</div></article>`;
}

renderChapterLesson();
