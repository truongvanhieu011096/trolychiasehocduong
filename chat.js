const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender;
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function quick(text) {
    input.value = text;
    send();
}

function send() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => {
        addMessage(getResponse(text.toLowerCase()), "bot");
    }, 500);
}

// Hàm chọn ngẫu nhiên
function r(arr) {
    if (!arr || arr.length === 0) return "";
    return arr[Math.floor(Math.random() * arr.length)];
}

// Kiểm tra xem có cần gợi form không
function needForm(msg) {
    if (!msg) return false;
    msg = msg.toLowerCase();
    return msg.includes("rất sợ") || msg.includes("bị đánh") || msg.includes("không dám nói") || msg.includes("đe dọa") || msg.includes("kéo dài");
}

// Dữ liệu câu trả lời ~1.000 câu
const topics = {
    "bắt nạt": Array(100).fill().map((_,i)=>`[Bắt nạt] Câu chia sẻ ${i+1}: Em có thể kể chi tiết để thầy cô hiểu rõ hơn không?`),
    "buồn": Array(100).fill().map((_,i)=>`[Buồn] Câu chia sẻ ${i+1}: Thầy cô cảm nhận em đang rất mệt 💙. Điều gì khiến em buồn nhất?`),
    "áp lực": Array(100).fill().map((_,i)=>`[Áp lực] Câu chia sẻ ${i+1}: Áp lực học tập có thể khiến em căng thẳng 😔. Em lo điểm số hay kỳ vọng của ai?`),
    "mạng": Array(100).fill().map((_,i)=>`[Mạng] Câu chia sẻ ${i+1}: Những lời nói trên mạng cũng làm em tổn thương 😞. Em đã gặp chuyện gì?`),
    "giao thông": Array(100).fill().map((_,i)=>`[ATGT] Câu chia sẻ ${i+1}: An toàn của em là quan trọng nhất 🚦. Em gặp tình huống nào?`),
    "sức khỏe": Array(100).fill().map((_,i)=>`[Sức khỏe] Câu chia sẻ ${i+1}: Em có thắc mắc về cơ thể, sức khỏe vị thành niên nào không?`),
    "bạn bè": Array(100).fill().map((_,i)=>`[Bạn bè] Câu chia sẻ ${i+1}: Em có vấn đề gì với bạn bè không?`),
    "gia đình": Array(100).fill().map((_,i)=>`[Gia đình] Câu chia sẻ ${i+1}: Em có lo lắng về mối quan hệ trong gia đình không?`),
    "stress": Array(100).fill().map((_,i)=>`[Stress] Câu chia sẻ ${i+1}: Em cảm thấy stress hoặc mệt mỏi như thế nào?`),
    "trầm cảm": Array(100).fill().map((_,i)=>`[Trầm cảm] Câu chia sẻ ${i+1}: Em có cảm giác buồn chán kéo dài hoặc mất hứng thú không?`)
};

// Bot trả lời
function getResponse(msg) {
    if (!msg) return "Thầy cô đang lắng nghe em 💙";

    let reply = "";

    for (let topic in topics) {
        if (Object.hasOwn(topics, topic)) {
            if (msg.includes(topic)) {
                // Chọn 2 câu ngẫu nhiên cùng topic để bot chủ động dẫn dắt
                reply = r(topics[topic]) + "<br>" + r(topics[topic]);
                break;
            }
        }
    }

    if (!reply) {
        reply = r([
            "Cảm ơn em đã chia sẻ 💙. Em có thể nói thêm để thầy cô hiểu rõ hơn không?",
            "Em còn điều gì khác đang làm em lo lắng không?",
            "Thầy cô muốn nghe thêm để hỗ trợ em tốt hơn.",
            "Em đã rất dũng cảm khi chia sẻ.",
            "Nếu em muốn, em có thể kể chi tiết hơn để thầy cô giúp."
        ]);
    }

    if (needForm(msg)) {
        reply += `
        <br><br>
        Nếu em thấy khó nói trực tiếp hoặc muốn chia sẻ kín, em có thể điền biểu mẫu:
        <br>
        <a href="https://forms.gle/PWc5rKJEGZw564zD8" target="_blank">
            📝 Biểu mẫu hỗ trợ kín đáo
        </a>`;
    }

    return reply;
}
