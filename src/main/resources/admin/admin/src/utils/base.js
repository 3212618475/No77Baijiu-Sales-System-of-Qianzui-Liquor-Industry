const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootp091v/",
            name: "springbootp091v",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootp091v/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于协同推荐的黔醉酒业白酒销售系统"
        } 
    }
}
export default base
