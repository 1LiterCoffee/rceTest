
$(document).ready(function () {
  let todoData = [];
  const countPerPage = 10;
  const showPageCnt = 5;

  var myHeaders = new Headers();
  myHeaders.append("coginsight-api-key", "yoS2HzMPxkWjpuoCHXsxDh6etrzFzaX0ta0ThtGRgxpdmqP7SWTFJ6V8dZuTOz0SLhg4rTtIvrvLcJ2Xynobig==|3VB0hdbZV8kpMYFRLp1gLb4RvhRc5aq6Ok9GWzDEiQ4=");
  myHeaders.append("coginsight-domain-id", "8145db75-5fbb-4440-bfea-f4ebd711f138");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://v2.coginsight.net/apis/esd/TEAMS_TEST/records?createdAt.from=2023-06-01", requestOptions)
    .then(response => response.json())
    .then(data => {
        todoData = data;
        $(".card-title").append(`<span class="text-muted fw-normal ms-2">(${todoData.length})</span>`)
        console.log('dd');
        setTable(1, todoData, countPerPage, showPageCnt);
        setPaging(1, todoData, countPerPage, showPageCnt);})
    .catch(error => console.log('error', error));

  //   fetch('https://jsonplaceholder.typicode.com/todos')
  // .then(response => response.json())
  // .then(data => {
  //   todoData = data;
  //     $(".card-title").append(`<span class="text-muted fw-normal ms-2">(${todoData.length})</span>`)
  //     console.log('dd');
  //     setTable(1, todoData, countPerPage, showPageCnt);
  //     setPaging(1, todoData, countPerPage, showPageCnt);
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  // });

  $(document).on("click", "div.paging>div.pages>span", function () {
    if (!$(this).hasClass("active")) {
      $(this).parent().find("span.active").removeClass("active");
      $(this).addClass("active");

      setTable(Number($(this).text()));
    }
  });

  $(document).on("click", "div.paging>i", function () {
    const totalPage =
      Math.floor(todoData.length / countPerPage) +
      (todoData.length % countPerPage == 0 ? 0 : 1);
    const id = $(this).attr("id");
    //console.log(id);

    if (id == "first_page") {
      setTable(1);
      setPaging(1);
    } else if (id == "prev_page") {
      let arrPages = [];
      $("div.paging>div.pages>span").each(function (idx, item) {
        arrPages.push(Number($(this).text()));
      });

      const prevPage = _.min(arrPages) - showPageCnt;
      setTable(prevPage);
      setPaging(prevPage);
    } else if (id == "next_page") {
      let arrPages = [];
      $("div.paging>div.pages>span").each(function (idx, item) {
        arrPages.push(Number($(this).text()));
      });

      const nextPage = _.max(arrPages) + 1;
      setTable(nextPage);
      setPaging(nextPage);
    } else if (id == "last_page") {
      const lastPage =
        Math.floor((totalPage - 1) / showPageCnt) * showPageCnt + 1;
      setTable(lastPage);
      setPaging(lastPage);
    }
  });

  function setTable(pageNum) {
    console.log(`setTable function run!!`);
    $("#tbody").empty();
    const filteredData = _.slice(
      todoData,
      (pageNum - 1) * countPerPage,
      pageNum * countPerPage
    );
    let tableBody = ``;
    for (let i = 0; i < filteredData.length; i++) {
      tableBody += `
        <tr>
            <td style="display: table-cell;
            text-align: center;
            vertical-align: middle;">${filteredData[i].id}</td>
            <td>${filteredData[i].completed}</td>
            <td>${filteredData[i].title}</td>
            <td>test</td>
        </tr>`;
    }
    $("#tbody").append(tableBody);
  }

  function setPaging(pageNum) {
    console.log(`setPaging function run!!`);

    const currentPage = pageNum;
    const totalPage =
      Math.floor(todoData.length / countPerPage) +
      (todoData.length % countPerPage == 0 ? 0 : 1);
    //console.log(currentPage, totalPage);

    showAllIcon();

    if (currentPage <= showPageCnt) {
      $("#first_page").hide();
      $("#prev_page").hide();
    }
    if (
      totalPage <= showPageCnt ||
      Math.floor((currentPage - 1) / showPageCnt) * showPageCnt +
        showPageCnt +
        1 >
        totalPage
    ) {
      $("#next_page").hide();
      $("#last_page").hide();
    }

    let start = Math.floor((currentPage - 1) / showPageCnt) * showPageCnt + 1;
    let sPagesHtml = "";
    for (
      const end = start + showPageCnt;
      start < end && start <= totalPage;
      start++
    ) {
      sPagesHtml +=
        '<span class="' +
        (start == currentPage ? "active" : "") +
        '">' +
        start +
        "</span>";
    }
    $("div.paging>div.pages").html(sPagesHtml);
  }
  function showAllIcon() {
    $("#first_page").show();
    $("#prev_page").show();
    $("#next_page").show();
    $("#last_page").show();
  }
});
