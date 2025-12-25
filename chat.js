const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const popup = document.getElementById("popup");

let mood = "";
let responseCount = 0;

input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});

// Chọn tâm trạng từ popup
function selectMood(selected) {
    mood = selected;
    popup.style.display = "none";
    addMessage(`Em đang cảm thấy: <b>${mood}</b>`, "user");
    setTimeout(() => addMessage(getResponse(mood.toLowerCase()), "bot"), 500);
}

// Thêm tin nhắn vào chat
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

// Lấy ngẫu nhiên câu trả lời
function r(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

// Các chủ đề và câu trả lời dài, nhẹ nhàng, hướng dẫn vượt qua
const topics = {
    "bị đánh": [
        "Em đã rất dũng cảm khi chia sẻ điều này. Điều đầu tiên, hãy báo ngay với bố mẹ để nhận sự hỗ trợ và bảo vệ an toàn.",
        "Đi kiểm tra sức khỏe, ghi lại bằng chứng nếu có, và thông báo thầy cô chủ nhiệm để họ cùng em xử lý.",
        "Ghi lại chi tiết: ngày, giờ, nơi xảy ra, và người liên quan. Điều này sẽ giúp thầy cô và bố mẹ có thông tin đầy đủ.",
        "Nếu sự việc lặp lại, liên hệ ban giám hiệu. Đừng giữ cảm xúc một mình, chia sẻ giúp em bớt căng thẳng.",
        "Học kỹ năng tự bảo vệ, tránh nơi nguy hiểm. Thầy cô luôn sẵn sàng đồng hành cùng em."
    ],
    "bắt nạt": [
        "Thầy cô hiểu cảm giác này, em đã rất can đảm khi chia sẻ.",
        "Ghi lại sự việc, báo người lớn tin cậy để được giúp đỡ.",
        "Nếu xảy ra trên mạng, hãy chụp màn hình, lưu lại bằng chứng và báo bố mẹ hoặc thầy cô.",
        "Đừng giữ cảm xúc một mình, chia sẻ giúp em bớt căng thẳng và cảm thấy an toàn hơn.",
        "Nhớ rằng em xứng đáng được tôn trọng. Nếu cần, em có thể điền form ẩn danh hoặc gọi trực tiếp thầy cô."
    ],
    "stress": [
        "Cảm giác căng thẳng là bình thường. Hãy thử hít thở sâu, đi dạo hoặc nghe nhạc để thư giãn.",
        "Viết ra những điều khiến em stress giúp em nhận diện và tìm cách giải quyết từng bước.",
        "Chia sẻ với bố mẹ hoặc thầy cô giúp em nhận được lời khuyên và sự đồng hành.",
        "Hãy nghỉ ngơi, ngủ đủ và sắp xếp thời gian học tập hợp lý.",
        "Nếu cảm giác kéo dài, em có thể điền form ẩn danh hoặc gọi trực tiếp thầy cô để được hỗ trợ."
    ],
    "lo lắng": [
        "Thầy cô hiểu em đang lo lắng. Hãy kể thêm để thầy cô biết rõ hơn.",
        "Hít thở sâu, phân tích những điều em có thể kiểm soát trước tiên.",
        "Chia sẻ với người tin cậy hoặc thầy cô sẽ giúp em bớt căng thẳng.",
        "Viết nhật ký hoặc vẽ giúp em giải tỏa cảm xúc.",
        "Nếu lo lắng kéo dài, điền form hoặc gọi trực tiếp thầy cô để được hướng dẫn cụ thể."
    ],
    "buồn": [
        "Cảm giác buồn là bình thường, thầy cô luôn sẵn sàng lắng nghe.",
        "Hãy thử chia sẻ với bạn bè, bố mẹ hoặc thầy cô để bớt nặng lòng.",
        "Đi dạo, nghe nhạc, viết nhật ký sẽ giúp tâm trạng dịu lại.",
        "Hãy dành thời gian chăm sóc bản thân, nghỉ ngơi đầy đủ.",
        "Nếu em vẫn buồn lâu, em có thể điền form ẩn danh hoặc gọi thầy cô để được đồng hành."
    ],
    "sức khỏe": [
        "Khi gặp vấn đề về sức khỏe, hãy chia sẻ ngay với bố mẹ hoặc thầy cô.",
        "Nếu có dấu hiệu bất thường, đi khám bác sĩ là cách tốt nhất để chăm sóc bản thân.",
        "Học cách giữ vệ sinh, ăn uống đủ chất và tập thể dục đều đặn.",
        "Nếu em cần tư vấn chi tiết hơn, có thể điền form hoặc gọi thầy cô trực tiếp."
    ],
    "mạng": [
        "Nếu em gặp bắt nạt trên mạng, chụp màn hình và báo bố mẹ hoặc thầy cô.",
        "Không phản hồi tiêu cực, tránh xung đột để bảo vệ bản thân.",
        "Chia sẻ cảm xúc giúp em bớt căng thẳng và nhận được lời khuyên.",
        "Nhớ rằng em xứng đáng được tôn trọng. Thầy cô luôn đồng hành."
    ],
    "atgt": [
        "Tuân thủ luật giao thông là cách bảo vệ bản thân.",
        "Đi cùng bạn hoặc người lớn khi đường vắng để an toàn.",
        "Chú ý biển báo và tín hiệu giao thông, không chạy xe khi mệt hay vội vàng.",
        "Nếu gặp tình huống nguy hiểm, hãy báo ngay người lớn tin cậy."
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

    // Nhắc gợi ý điền form sau mỗi 10 câu trả lời
    if(responseCount>=10 && responseCount%10===0){
        reply += "<br><br>💡 Nếu em vẫn còn lo lắng, em có thể điền biểu mẫu kín hoặc gọi trực tiếp thầy cô:";
        reply += `<br><a href="https://forms.gle/PWc5rKJEGZw564zD8" target="_blank">📝 Biểu mẫu hỗ trợ kín đáo</a>`;
        reply += `<br>📞 Gọi trực tiếp: 0909123456`;
    }

    return reply;
}
