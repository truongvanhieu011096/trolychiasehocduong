const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const popup = document.getElementById("popup");

let mood = "";
let responseCount = 0;

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
    return arr[Math.floor(Math.random()*arr.length)];
}

const topics = {
    "bị đánh": [
        "Em đã rất dũng cảm khi chia sẻ điều này.",
        "Điều đầu tiên: báo ngay với bố mẹ để nhận hỗ trợ và bảo vệ an toàn.",
        "Đi kiểm tra sức khỏe, ghi chú các vết thương nếu có.",
        "Thông báo thầy cô chủ nhiệm để họ cùng em xử lý sự việc.",
        "Ghi lại chi tiết: ngày giờ, nơi xảy ra, chứng cứ nếu có.",
        "Nếu tình trạng lặp lại, liên hệ ban giám hiệu.",
        "Học kỹ năng tự bảo vệ, tránh nơi nguy hiểm.",
        "Đừng giữ cảm xúc một mình, chia sẻ giúp em bớt căng thẳng.",
        "Nếu cần, em có thể điền form kín hoặc gọi trực tiếp thầy cô."
    ],
    "bắt nạt": [
        "Thầy cô hiểu cảm giác này, em đã rất can đảm khi chia sẻ.",
        "Ghi lại sự việc, báo người lớn tin cậy.",
        "Nếu xảy ra trên mạng, chụp màn hình và báo thầy cô hoặc bố mẹ.",
        "Đừng giữ cảm xúc một mình, chia sẻ giúp em bớt căng thẳng.",
        "Nhớ rằng em xứng đáng được tôn trọng và an toàn."
    ],
    "buồn":["Cảm giác buồn là bình thường. Chia sẻ với người tin cậy.","Viết nhật ký giúp nhận diện cảm xúc.","Đi dạo, nghe nhạc giúp cải thiện tâm trạng.","Nếu buồn lâu, chia sẻ với thầy cô."],
    "lo lắng":["Hít thở sâu, phân tích điều có thể kiểm soát.","Chia sẻ với thầy cô hoặc bố mẹ.","Viết ra điều lo để tìm cách giải quyết.","Nếu kéo dài → điền form hoặc gọi thầy cô."],
    "stress":["Nghỉ giải lao, tập thể dục, nghe nhạc thư giãn.","Sắp xếp công việc, học tập theo từng bước.","Chia sẻ với thầy cô hoặc người tin cậy.","Nếu kéo dài → điền form hoặc gọi thầy cô."],
    "sức khỏe":["Chia sẻ với bố mẹ hoặc thầy cô.","Đến bác sĩ khi có dấu hiệu bất thường.","Thầy cô hướng dẫn cách chăm sóc sức khỏe.","Nếu cần → điền form hoặc gọi trực tiếp."],
    "mạng":["Không trả lời xúc phạm, chặn người gây hại.","Lưu lại bằng chứng, báo thầy cô hoặc bố mẹ.","Chia sẻ cảm xúc giúp bớt căng thẳng.","Luôn nhớ em xứng đáng được tôn trọng."],
    "ATGT":["Tuân thủ luật giao thông.","Đi cùng bạn hoặc người lớn khi đường vắng.","Chú ý biển báo, tín hiệu.","Báo người lớn nếu gặp tình huống nguy hiểm."]
};

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
            "Cảm ơn em đã chia sẻ 💙. Em có thể nói thêm để thầy cô hiểu rõ hơn không?",
            "Em còn điều gì khác đang lo lắng không?",
            "Thầy cô muốn nghe thêm để hỗ trợ em tốt hơn.",
            "Em đã rất dũng cảm khi chia sẻ.",
            "Nếu em muốn, em có thể kể chi tiết hơn để thầy cô giúp."
        ]);
    }

    if(responseCount>=10 && responseCount%10===0){
        reply += "<br><br>💡 Nếu em vẫn còn lo lắng, em có thể điền biểu mẫu kín hoặc gọi trực tiếp thầy cô:";
        reply += `<br><a href="https://forms.gle/PWc5rKJEGZw564zD8" target="_blank">📝 Biểu mẫu hỗ trợ kín đáo</a>`;
        reply += `<br>📞 Gọi trực tiếp: 0909123456`;
    }

    return reply;
}
