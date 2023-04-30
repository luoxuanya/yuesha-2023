
// 定义一个字幕接口
interface Subtitle {
    index: number;
    startTime: string;
    endTime: string;
    content: string;
}

// 定义一个函数，接受一个dom元素，一个音频元素和一个json字符串，返回一个字幕显示器
  export function createSubtitlePlayer(element: HTMLElement, audio: HTMLAudioElement, json: string): () => void {
    // 解析json字符串为字幕数组
    const subtitles: Subtitle[] = JSON.parse(json);

    // 定义一个变量，存储当前字幕的索引
    let currentIndex = 0;

    // 定义一个变量，存储当前字幕的结束时间
    let currentEndTime = 0;

    // 定义一个函数，根据当前时间更新字幕
    function updateSubtitle(): void {
        // 获取音频元素的当前时间，单位为秒
        const currentTime = audio.currentTime;

        // 如果当前时间超过了当前字幕的结束时间，或者当前字幕不存在，则切换到下一个字幕
        if (currentTime > currentEndTime || currentIndex >= subtitles.length) {
            // 获取下一个字幕
            const nextSubtitle = subtitles[currentIndex];

            // 如果下一个字幕存在，则更新当前字幕的索引和结束时间，并显示其内容
            if (nextSubtitle) {
                currentIndex++;
                currentEndTime = parseTime(nextSubtitle.endTime);
                element.textContent = nextSubtitle.content;
            } else {
                // 如果下一个字幕不存在，则停止更新
                clearInterval(intervalId);
            }
        }
    }

    // 定义一个函数，将时间字符串转换为秒数
    function parseTime(time: string): number {
        // 将时间字符串按冒号分割为时分秒数组
        const parts = time.split(":");

        // 将时分秒数组转换为秒数，并累加返回
        return parts.reduce((total, part) => total * 60 + Number(part), 0);
    }

    // 定义一个变量，存储定时器的id
    let intervalId: number;

    // 定义一个函数，开始播放字幕
    function start(): void {
        // 设置定时器，每隔100毫秒更新一次字幕
        intervalId = setInterval(updateSubtitle, 100);
    }

    // 返回开始播放字幕的函数
    return start;
}



// 定义一个函数，接收一个 SRT 字符串和一个回调函数作为参数
export const srtToJson = (srtString: string, callback: (error: Error | null, result: string) => void) => {
    // 定义一个正则表达式，用于匹配 SRT 文件中的字幕信息
    const regex = /(\d+)\r?\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\r?\n([\s\S]*?(?=\r?\n\r?\n|$))/g;
    // 定义一个函数，将时间字符串转换为 HTML 视频元素可以识别的格式
    const formatTime = (time: string) => time.replace(",", ".");
    // 使用正则表达式的 matchAll 方法，获取 SRT 字符串中的所有字幕信息
    const matches = srtString.matchAll(regex);
    // 使用数组的 map 方法，将每个字幕信息转换为一个字幕对象
    const subtitles = Array.from(matches, match => {
        // 将匹配到的字幕信息分别赋值给变量
        const [_, index, startTime, endTime, content] = match;
        // 返回一个字幕对象，包含索引、开始时间、结束时间和内容属性
        return {
            index: Number(index),
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            content: content.trim(),
        };
    });
    // 使用 JSON.stringify 方法，将字幕数组转换为 JSON 字符串
    const json = JSON.stringify(subtitles);
    // 调用回调函数，传入 null 和 JSON 字符串
    callback(null, json);

}