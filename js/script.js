document.addEventListener('DOMContentLoaded', () => {
    fetchNotices();
    fetchLastUpdateTime(); // ✅ 파일 수정 시간 가져오기 함수 호출
});

// 1. GitHub API를 이용해 파일의 실제 수정 시간 가져오기
async function fetchLastUpdateTime() {
    try {
        // GitHub API를 통해 파일 정보 조회 (사용자명/리포지토리명/경로 확인 필요)
        const response = await fetch('https://api.github.com/repos/skrtjd/StelliveKaraoke/commits?path=index.html&page=1&per_page=1');
        const commits = await response.json();
        
        if (commits && commits.length > 0) {
            const lastDate = new Date(commits[0].commit.committer.date);
            
            // yyyy-mm-dd-hh-mm-ss 형식으로 변환
            const year = lastDate.getFullYear();
            const month = String(lastDate.getMonth() + 1).padStart(2, '0');
            const day = String(lastDate.getDate()).padStart(2, '0');
            const hours = String(lastDate.getHours()).padStart(2, '0');
            const mins = String(lastDate.getMinutes()).padStart(2, '0');
            const secs = String(lastDate.getSeconds()).padStart(2, '0');
            
            const formattedTime = `최근 공지 업데이트: ${year}-${month}-${day}-${hours}-${mins}-${secs}`;
            document.getElementById('last-update-time').innerText = formattedTime;
        }
    } catch (error) {
        console.error('업데이트 시간 로드 실패:', error);
    }
}
