const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const popup = document.getElementById("popup");

let mood = "";
let responseCount = 0;

input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});

// Chọn tâm trạng
function selectMood(selected) {
    mood = selected;
    popup.style.display = "none";
    addMessage(`Em đang cảm thấy: <b>${mood}</b>`, "user");
    setTimeout(() => addMessage(getResponse(mood.toLowerCase()), "bot"), 500);
}

// Thêm tin nhắn
function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender;
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    if(sender === "bot") responseCount++;
}

// Gửi tin nhắn từ input
function send() {
    const text = input.value.trim();
    if(!text) return;
    addMessage(text,"user");
    input.value="";
    setTimeout(()=> addMessage(getResponse(text.toLowerCase()),"bot"), 500);
}

// Lấy ngẫu nhiên
function r(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// Chủ đề & câu trả lời dài, nhẹ nhàng
const topics = {
    "bị đánh": [
        "Em đã rất dũng cảm khi chia sẻ 💙. Báo bố mẹ để nhận sự hỗ trợ và bảo vệ bản thân.",
        "Ghi lại chi tiết sự việc, thông báo thầy cô chủ nhiệm để họ đồng hành cùng em.",
        "Đi kiểm tra sức khỏe nếu bị thương và giữ hồ sơ y tế.",
        "Học kỹ năng tự bảo vệ, tránh nơi nguy hiểm.",
        "Nếu em muốn, hãy thử suy nghĩ cách giảm nguy cơ gặp lại tình huống tương tự.",
        "Em xứng đáng được tôn trọng. Hãy chia sẻ cảm xúc để bớt căng thẳng.",
        "Nếu cần, em có thể điền form ẩn danh 📝 hoặc gọi trực tiếp thầy cô 📞."
    ],
    "bắt nạt": [
        "Thầy cô hiểu cảm giác này. Em đã rất can đảm khi chia sẻ.",
        "Ghi lại sự việc và báo người lớn tin cậy.",
        "Nếu xảy ra trên mạng, chụp màn hình và báo bố mẹ/thầy cô.",
        "Chia sẻ cảm xúc giúp em bớt căng thẳng và nhận lời khuyên.",
        "Nhớ rằng em xứng đáng được tôn trọng. Form ẩn danh 📝 hoặc gọi thầy cô 📞 luôn sẵn sàng."
    ],
    "stress": [
        "Căng thẳng là bình thường. Hít thở sâu hoặc đi dạo giúp em dịu tâm trạng.",
        "Viết nhật ký để nhận diện cảm xúc.",
        "Chia sẻ với bố mẹ hoặc thầy cô giúp bớt nặng lòng.",
        "Hãy nghỉ ngơi, ngủ đủ và sắp xếp thời gian hợp lý.",
        "Nếu kéo dài, điền form ẩn danh 📝 hoặc gọi thầy cô 📞 để được hỗ trợ."
    ],
    "lo lắng": [
        "Thầy cô hiểu em đang lo lắng. Hãy kể thêm để thầy cô hiểu rõ hơn.",
        "Hít thở sâu, phân tích những điều em có thể kiểm soát trước tiên.",
        "Chia sẻ với người tin cậy hoặc thầy cô sẽ giúp em bớt căng thẳng.",
        "Viết nhật ký hoặc vẽ giúp em giải tỏa cảm xúc.",
        "Nếu lo lắng kéo dài, điền form 📝 hoặc gọi thầy cô 📞 để được hướng dẫn."
    ],
    "buồn": [
        "Cảm giác buồn là bình thường, thầy cô luôn sẵn sàng lắng nghe.",
        "Chia sẻ với bố mẹ hoặc thầy cô để bớt nặng lòng.",
        "Đi dạo, nghe nhạc, viết nhật ký giúp tâm trạng dịu lại.",
        "Dành thời gian chăm sóc bản thân, nghỉ ngơi đầy đủ.",
        "Nếu vẫn buồn lâu, điền form 📝 hoặc gọi thầy cô 📞 để được đồng hành."
    ]
};

// Lấy câu trả lời từ message
function getResponse(msg){
    let reply="";

    for(let topic in topics){
        if(msg.includes(topic)){
            reply = r(topics[topic]);
            break;
        }
    }

    if(!reply){
        reply = r([
            "Cảm ơn em đã chia sẻ 💙. Em có thể kể thêm để thầy cô hiểu rõ hơn không?",
            "Em còn điều gì khác đang lo lắng không? Thầy cô muốn nghe để đồng hành cùng em.",
            "Hãy kể chi tiết hơn nếu em muốn, thầy cô sẽ giúp em từng bước.",
            "Em đã rất dũng cảm khi chia sẻ, điều đó rất quan trọng.",
            "Nếu em muốn, em có thể nói ra tất cả những gì đang khiến em bối rối, thầy cô sẽ hướng dẫn cách giải quyết."
        ]);
    }

    // Nhắc gợi ý form sau mỗi 10 câu
    if(responseCount>=10 && responseCount%10===0){
        reply += "<br><br>💡 Nếu em vẫn còn lo lắng, em có thể điền biểu mẫu kín 📝 hoặc gọi trực tiếp thầy cô 📞:";
        reply += `<br><a href="https://forms.gle/PWc5rKJEGZw564zD8" target="_blank">Gửi Form ẩn danh</a>`;
        reply += `<br>📞 Gọi trực tiếp: 0909123456`;
    }

    return reply;
}
