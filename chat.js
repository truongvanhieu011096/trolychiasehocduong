const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const popup = document.getElementById("popup");

let mood = "";
let responseCount = 0; // Đếm số câu bot đã trả lời HS

input.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
});

function selectMood(selected) {
    mood = selected;
    popup.style.display = "none";
    addMessage(`Em đang cảm thấy: <b>${mood}</b>`, "user");
    setTimeout(() => addMessage(getResponse(mood.toLowerCase()), "bot"), 500);
}

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender;
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === "bot") responseCount++;
}

function send() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => addMessage(getResponse(text.toLowerCase()), "bot"), 500);
}

function r(arr) {
    if (!arr || arr.length===0) return "";
    return arr[Math.floor(Math.random()*arr.length)];
}

// Xác định nhạy cảm → form
function needForm(msg) {
    if (!msg) return false;
    const sensitive = ["rất sợ","bị đánh","không dám nói","đe dọa","kéo dài"];
    return sensitive.some(k=>msg.includes(k));
}

// Câu chia sẻ kiểu chuyên gia
const topics = {
    "bắt nạt": [
        "Em đã dũng cảm khi chia sẻ vấn đề này. Việc nhận ra và nói ra là bước đầu tiên để giải quyết.",
        "Hãy thử kể chi tiết sự việc, thầy cô sẽ hướng dẫn cách xử lý an toàn.",
        "Em có thể học cách bảo vệ bản thân và tìm sự hỗ trợ từ người lớn tin cậy.",
        "Quan sát tình huống, tránh nguy cơ, và ghi lại sự việc để xử lý sau.",
        "Nếu việc này lặp lại, em nên chia sẻ ngay với thầy cô hoặc biểu mẫu kín."
    ],
    "buồn": [
        "Cảm giác buồn là bình thường, nhưng đừng để nó kiểm soát em.",
        "Hãy thử viết ra cảm xúc hoặc nói chuyện với người tin cậy.",
        "Các hoạt động như đi dạo, nghe nhạc, hoặc tập thể dục nhẹ giúp cải thiện tâm trạng.",
        "Nhận biết cảm xúc là bước quan trọng để em tự chăm sóc bản thân.",
        "Nếu cảm xúc quá nặng, thầy cô luôn sẵn sàng hỗ trợ trực tiếp."
    ],
    "lo lắng": [
        "Lo lắng là phản ứng tự nhiên, nhưng đừng để nó cản trở học tập và cuộc sống.",
        "Thử hít thở sâu và xác định điều em có thể kiểm soát.",
        "Viết ra những lo lắng giúp em nhìn nhận và giải quyết từng bước.",
        "Chia sẻ với thầy cô hay người thân để nhận hướng dẫn.",
        "Nếu lo lắng kéo dài, em nên điền biểu mẫu hoặc gọi thầy cô."
    ],
    "stress": [
        "Stress học đường xảy ra với nhiều HS, quan trọng là nhận ra nó.",
        "Hãy nghỉ giải lao, thư giãn cơ thể và làm việc theo từng bước.",
        "Kỹ năng quản lý thời gian và đặt mục tiêu nhỏ giúp giảm stress.",
        "Thầy cô có thể hướng dẫn em kỹ thuật thư giãn nhanh.",
        "Nếu stress kéo dài, đừng ngần ngại nhờ sự hỗ trợ chuyên nghiệp."
    ],
    "trầm cảm": [
        "Cảm giác buồn lâu ngày, mất hứng thú là dấu hiệu cần lưu ý.",
        "Đừng chịu một mình, hãy chia sẻ với người tin cậy.",
        "Hoạt động thể chất, thở sâu và nói chuyện với người thân giúp cải thiện.",
        "Thầy cô có thể hướng dẫn em từng bước vượt qua cảm giác này.",
        "Nếu cảm giác nặng, em nên điền form hỗ trợ hoặc gọi trực tiếp."
    ]
};

function getResponse(msg){
    let reply = "";

    for(let topic in topics){
        if(Object.hasOwn(topics,topic) && msg.includes(topic)){
            reply = r(topics[topic]);
            break;
        }
    }

    if(!reply){
        reply = r([
            "Cảm ơn em đã chia sẻ 💙. Em có thể nói thêm để thầy cô hiểu rõ hơn không?",
            "Em còn điều gì khác đang lo lắng không?",
            "Thầy cô muốn nghe thêm để hỗ trợ em tốt hơn.",
            "Em đã rất dũng cảm khi chia sẻ.",
            "Nếu em muốn, em có thể kể chi tiết hơn để thầy cô giúp."
        ]);
    }

    // Gợi ý form hoặc gọi khi số câu nhiều
    if(responseCount>=10 && responseCount%10===0){
        reply += "<br><br>💡 Nếu em vẫn còn lo lắng, em có thể điền biểu mẫu kín hoặc gọi trực tiếp cho thầy cô để được hỗ trợ nhanh:";
        reply += `<br><a href="https://forms.gle/PWc5rKJEGZw564zD8" target="_blank">📝 Biểu mẫu hỗ trợ kín đáo</a>`;
        reply += `<br>📞 Gọi trực tiếp: 0909123456`;
    }

    return reply;
}
