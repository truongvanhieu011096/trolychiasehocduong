const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const popup = document.getElementById("popup");

let mood = "";
let responseCount = 0; // đếm số câu bot đã trả lời

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
    if(sender === "bot") responseCount++;
}

function send() {
    const text = input.value.trim();
    if(!text) return;
    addMessage(text,"user");
    input.value="";
    setTimeout(()=> addMessage(getResponse(text.toLowerCase()),"bot"), 500);
}

function r(arr){
    if(!arr||arr.length===0) return "";
    return arr[Math.floor(Math.random()*arr.length)];
}

function needForm(msg){
    if(!msg) return false;
    const sensitive = ["rất sợ","bị đánh","không dám nói","đe dọa","kéo dài"];
    return sensitive.some(k=>msg.includes(k));
}

// Câu chia sẻ chuyên gia (ví dụ, có thể mở rộng thêm)
const topics = {
    "bắt nạt":["Thầy cô hiểu cảm giác của em. Việc nói ra là bước đầu tiên.","Ghi lại sự việc và chia sẻ với người lớn tin cậy.","Nếu việc này kéo dài, hãy liên hệ thầy cô hoặc biểu mẫu kín."],
    "buồn":["Cảm giác buồn là bình thường. Hãy chia sẻ với người tin cậy.","Thử viết ra cảm xúc để nhìn nhận chúng.","Nếu buồn lâu, thầy cô luôn sẵn sàng giúp em."],
    "lo lắng":["Lo lắng là tự nhiên. Hãy thử hít thở sâu và xác định điều có thể kiểm soát.","Chia sẻ với thầy cô giúp em bớt căng thẳng."],
    "stress":["Stress xảy ra nhiều học sinh. Nghỉ giải lao và làm việc từng bước giúp giảm stress.","Thầy cô có thể hướng dẫn kỹ thuật thư giãn."],
    "trầm cảm":["Cảm giác mất hứng thú, buồn lâu là cần chú ý.","Đừng chịu một mình, hãy chia sẻ với người tin cậy.","Nếu nặng, điền form hoặc gọi thầy cô."]
};

function getResponse(msg){
    let reply="";

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

    // Gợi ý form/gọi sau mỗi 10 câu
    if(responseCount>=10 && responseCount%10===0){
        reply += "<br><br>💡 Nếu em vẫn còn lo lắng, em có thể điền biểu mẫu kín hoặc gọi trực tiếp cho thầy cô:";
        reply += `<br><a href="https://forms.gle/PWc5rKJEGZw564zD8" target="_blank">📝 Biểu mẫu hỗ trợ kín đáo</a>`;
        reply += `<br>📞 Gọi trực tiếp: 0909123456`;
    }

    return reply;
}
