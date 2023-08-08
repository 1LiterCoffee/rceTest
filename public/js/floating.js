let fileArr = [];
let sendYn = false;
let floatingOpenYn = false;
let editor;
// 환경변수로 바꿔야하는데 테스트 환경에서는 nodejs지만 스프링으로 변경해야해서 수석님한테 물어볼것!
const apiHeaders = new Headers({
  Authorization:
    "Basic Y29nQG1pbmR3YXJld29ya3MuY29tL3Rva2VuOmcycUo5Z0RkTDF0bDJ3cnpmNmRReUhIQmR4YTNBdE9Va2c4M25DRWk=",
  Cookie:
    "__cfruid=14c888647753f4b6452a8a32a33356387a20fec6-1689828843; _zendesk_cookie=BAhJIhl7ImRldmljZV90b2tlbnMiOnt9fQY6BkVU--0bf2100788cb010d0183feca16aaf88ccaf719ca",
});
$(document).ready(function () {
  //초기 세팅
  var inquiryArea = [
    "<div class='inquiry-box'>",
    "<div class='inquiry-frame'>",
    "<button class='close'><i style='color: rgb(40, 50, 10) !important;'class='bi bi-chevron-compact-down'></i></button>",
    "</div>",
    "</div>",
  ].join("");
  var inquiryBtn =
    "<button class='inquiry-start'><img src='../img/ico_intro.png'/></button>";

  $(inquiryArea).appendTo("body");
  $(inquiryBtn).appendTo("body");
  // 플로팅 버튼 클릭 문의하기 띄우기
  
  $(".inquiry-start").on("click", function () {
    $(".inquiry-start").css("display", "none");
    $(".inquiry-box").css("display", "block");
    if(!floatingOpenYn){
      loadinquiry();
      floatingOpenYn = true;
    }
    //문의 접수 후 다시 클릭
    if (sendYn) {
      $(".inquiry-frame").children().not(".close").remove();
      sendYn = false;
    }
  });

  $(".close").on("click", function () {
    $(".inquiry-box").css("display", "none");
    $(".inquiry-start").css("display", "block");
  });
});
/** 플로팅 화면 로드 */
function loadinquiry() {
  const frameBody = `
  <div class='wrap-contact2' style="padding:0px !important;">
  <div class="wrap-title"><span class="contact2-form-title">문의하기</span></div>
    <form class="contact2-form validate-form" id="formData">
      <div class="wrap-input2 validate-input" data-validate="이메일 형식을 맞춰주세요">
      <span class="label-input2">이메일</span><span style="color:indianred">*</span>
      <input class="input2" type="email" name="email" placeholder="">
      <span class="focus-input2"></span>
      </div>
      <div class="wrap-input2 validate-input" data-validate="이름은 필수입니다.">
        <span class="label-input2">이름</span><span style="color:indianred">*</span>
        <input class="input2" type"text" name="name" required autocomplete="off" id="name"/>
        <span class="focus-input2"></span>
      </div>
      <div class="wrap-input2 validate-input" data-validate="사이트는 필수입니다.">
        <span class="label-input2">사이트</span><span style="color:indianred">*</span>
        <input class="input2" type"text" placeholder="마인드웨어웍스" name="site" autocomplete="off" required />
        <span class="focus-input2"></span>
      </div>
      <div class="wrap-input2 validate-input" data-validate="제목은 필수입니다.">
        <span class="label-input2">제목</span><span style="color:indianred">*</span>
        <input class="input2" type"text" name="title" autocomplete="off" required/>
        <span class="focus-input2"></span>
      </div>
      <div id="last-input" class="wrap-input2 validate-input" data-validate="문의내용은 필수입니다.">
        <span class="label-input2">문의내용</span><span style="color:indianred">*</span>
        <textarea class="input2" name="comment" autocomplete="off" required id="comment"></textarea>
        <span class="focus-input2"></span>
      </div>
      <div class="input-file" style="margin-bottom: 10px;">
        <label class="input-file-button" for="input-file">
        <i class="bi bi-file-earmark-plus" style="margin-right:10px;"></i> 파일 5개까지 추가
        </label>
        <input type="file" id="input-file" name="files[]" multiple style="display:none;"/>
      </div>
    </form>
    <div class="wrap-footer">
      <span style="padding: 10px;"><img style="width:100px;"src="../img/logo-mind.png"/></span>
      <div>
        <button id="submitBtn">보내기</button>
      </div>
      
    </div>
  </div>
  `;
  $(".inquiry-frame").append(frameBody);
   // textarea에 입력되는 내용이 변경될 때마다 자동으로 높이를 조절
  $("textarea").on("input", autoResizeTextarea);
   // 페이지 로드 시 초기 높이를 설정
  $("textarea").each(autoResizeTextarea);
  /**input 변경 감지, class 변경*/
  $(".input2").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });
  // 포커스 후 강조 삭제
  $(".validate-form .input2").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });
  // 파일 업로드 감지
  $("#input-file").change(function () {
    fileArr.push(...this.files);
    fileArr = [...fileArr];
    showFileList();
  });
  // 폼 제출로 변경
  $("#submitBtn").on("click", function () {
    $("#formData").submit();
  });
  // 파일 업로드 시 기존 선택값 삭제
  $("#input-file").on("click", function () {
    $(this).val(null);
  });

  formSubmit();
}



/** 폼 제출*/
function formSubmit() {
  // form 제출
  $("#formData").on("submit", async function (event) {
    event.preventDefault();
    let fields = [
      {
        name: "email",
        selector: '.validate-input input[name="email"]',
        required: true,
        pattern:
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
      },
      {
        name: "name",
        selector: '.validate-input input[name="name"]',
        required: true,
      },
      {
        name: "site",
        selector: '.validate-input input[name="site"]',
        required: true,
      },
      {
        name: "title",
        selector: '.validate-input input[name="title"]',
        required: true,
      },
      {
        name: "comment",
        selector: '.validate-input textarea[name="comment"]',
        required: true,
      },
    ];
    
    let invalidFields = [];
    fields.forEach((field) => {
      let input = $(field.selector);
      let value = input.val().trim();
      let valid =
        !(field.required && value === "") &&
        !(field.pattern && !field.pattern.test(value));

      if (!valid) {
        invalidFields.push(field.selector);
        showValidate(input); // 유효하지 않은 입력에 대한 오류 메시지 표시
      } else {
        hideValidate(input); // 유효한 입력에 대한 오류 메시지 숨기기
      }
    });

    let check = invalidFields.length === 0;
    //유효성 체크 통과
    if (check) {
      loading("show");
      await createTicket($(this).serializeArray(), (err, data) => {
        if (err) {
          console.log(err);
          errorScreen();
        } else {
          console.log({ status: data.status, statusText: data.statusText });
          completedScreen();
        }
      });
      fileArr = []; //초기화
      $(this).trigger("reset");
      $(".input-file-div").remove();
      loading("hide");
      $(".contact2-form").hide();
      $("#submitBtn").hide();
    } else {
      scrollTo("#formData", invalidFields[0]);
    }

    return check;
  });
}
/** 티켓 생성 API 호출 (중요)*/
async function createTicket(formData, callback) {
  console.log("createTicket function start");
  $("#submitBtn").prop("disabled", true);
  let tokenList = [];
  // 파일 업로드
  if (fileArr.length > 0) {
    await uploadFile(fileArr, (err, data) => {
      if (err) {
        callback(err, data);
        return false;
      } else {
        tokenList = data;
      }
    });
    if (_.isEmpty(tokenList)) {
      return;
    }
  }
  // 티켓 생성 body 세팅
  let createBody = {
    ticket: {
      subject: formData.find((o) => o.name == "title").value,
      comment: {
        body: formData.find((o) => o.name == "comment").value,
        uploads: tokenList,
      },
      custom_fields: [
        {
          id: 20604769936153,
          value: formData.find((o) => o.name == "site").value,
        },
        {
          id: 20611214831257,
          value: formData.find((o) => o.name == "name").value,
        },
      ],
      requester: {
        name: formData.find((o) => o.name == "name").value,
        email: formData.find((o) => o.name == "email").value,
      },
    },
  };
  // file 업로드 시 "Content-Type"을 바꿔주기때문에 다시 바꿔줘야함
  apiHeaders.set("Content-Type", "application/json");
  let createOption = {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify(createBody),
    redirect: "follow",
  };
  // 티켓 생성 api 호출
  const result = await fetch("zen/api/v2/tickets.json", createOption);
  console.log(result);
  if (result.ok) {
    const response = await result.json();
    callback(null, result);
    console.log("create success!!:", response);
    return;
  } else {
    callback({ status: result.status, statusText: result.statusText }, result);
    alert("생성중 오류가 발생했습니다. 잠시 후 다시 등록해주세요.");
    console.log("티켓 생성 실패", result.json());
    return;
  }
}
/** 파일 업로드 */
async function uploadFile(fileArr, callback) {
  let tokenList = [];

  if (!_.isEmpty(fileArr)) {
    console.log(`파일 업로드 ${fileArr.length}건 실행`);
    for (const file of fileArr) {
      apiHeaders.set("Content-Type", file.type || "text/plain"); // 브라우저에서 MIME를 정해주지않으면 text/plain으로 변경
      try {
        let requestOptions = {
          method: "POST",
          headers: apiHeaders,
          body: file,
          redirect: "follow",
        };

        const response = await fetch(
          `zen/api/v2/uploads.json?filename=${file.name}`,
          requestOptions
        );
        if (response.ok) {
          const result = await response.json();
          tokenList.push(result.upload.token);
        } else {
          console.log(`파일 업로드 에러 발생>> ${file.name}`);
          callback(
            { status: response.status, statusText: response.statusText },
            response
          );
          return;
        }
      } catch (error) {
        console.error("error", error);
      }
    }
    callback(null, tokenList);
    console.log("파일 업로드 종료");
  }
}
/** 파일 미리보기 화면 */
function showFileList() {
  console.log(fileArr);
  const MAX_FILE_COUNT = 5;
  const MAX_FILE_SIZE_MB = 50;
  let preview = "";
  let uniqueFiles = [];
  let duplicateFiles = [];
  let overSizeFiles = [];
  for (let i = 0; i < fileArr.length; i++) {
    let file = fileArr[i];
    const fileSizeMB = file.size / (1024 * 1024);
    // 중복 파일 여부 확인
    if (uniqueFiles.some((f) => f.lastModified === file.lastModified)) {
      duplicateFiles.push(file);
      continue;
    } else if (fileSizeMB > MAX_FILE_SIZE_MB) {
      // 파일 사이즈 초과
      overSizeFiles.push(file);
      continue;
    } else {
      uniqueFiles.push(file);
    }

    // 파일 미리보기 생성
    if (uniqueFiles.length > MAX_FILE_COUNT) {
      preview += `
        <div class="input-file-div warning" id="warning-max">
          <div>
            <i class="bi bi-exclamation-triangle-fill"></i>
            첨부 파일 한계에 도달했습니다.<br>
            최대 ${MAX_FILE_COUNT}개의 첨부 파일을 업로드할 수 있습니다.
            <i id="max" class="bi bi-x-lg delete"></i>
          </div>
        </div>`;
      break;
    } else {
      preview += `
        <div class="input-file-div">
          <div>
            <i class="bi bi-file-earmark-arrow-up"></i>
            ${file.name}
            <i id="delete" data-index='${file.lastModified}' class="bi bi-x-lg delete"></i>
          </div>
        </div>`;
    }
  }
  fileArr = [...uniqueFiles.slice(0, 5)]; // 파일 리스트 정리

  // 중복 파일이 있으면 사용자에게 알림 표시
  if (duplicateFiles.length > 0) {
    const duplicateWarning = `
      <div class="input-file-div warning" id="warning-duplicate">
        <div>
          <i class="bi bi-exclamation-triangle-fill"></i>
          다음 파일은 중복되어 제외되었습니다: ${duplicateFiles
            .map((file) => file.name)
            .join(", ")}
            <i id="duplicate" class="bi bi-x-lg delete"></i>
        </div>
      </div>`;
    preview += duplicateWarning;
  }
  // 파일 사이즈 초과한 파일이 있으면 사용자에게 알림 표시
  if (overSizeFiles.length > 0) {
    const overSizeWarning = `
      <div class="input-file-div warning" id="warning-overSize">
        <div>
          <i class="bi bi-exclamation-triangle-fill"></i>
          다음 파일들은 크기가 ${MAX_FILE_SIZE_MB}MB를 초과합니다. ${overSizeFiles
      .map((file) => `${file.name}:${_.floor(file.size / (1024 * 1024), 2)}MB`)
      .join(", ")}
            <i id="overSize" class="bi bi-x-lg delete"></i>
        </div>
      </div>`;
    preview += overSizeWarning;
  }
  // 파일 개수에 따라 입력 상태 변경
  if (uniqueFiles.length >= MAX_FILE_COUNT) {
    $("#input-file").prop("disabled", true);
  } else {
    $("#input-file").prop("disabled", false);
  }
  // 미리보기 출력
  $(".input-file-div").remove();
  $("#last-input").after(preview);
  scrollToBottom("formData");
}
/** 파일 삭제 버튼 액션 */
(function deleteFile() {
  $(document).on("click", ".delete", function () {
    const id = $(this).attr("id");
    if (id == "duplicate" || id == "max" || id == "overSize") {
      if (id == "duplicate") {
        $("#warning-duplicate").remove();
      } else if (id == "max") {
        $("#warning-max").remove();
      } else {
        $("#warning-overSize").remove();
      }
    } else {
      let dataIndexValue = $(this).data("index");
      fileArr = [...fileArr].filter((o) => o.lastModified !== dataIndexValue);
      showFileList();
    }
  });
})();
/**textarea 크기 조절 */
function autoResizeTextarea() {
  $(this).css("height", "auto");
  $(this).css("height", this.scrollHeight + "px");
}
/** 문의 접수 완료 화면 */
function completedScreen() {
  let completed = `
  <div class="wrap-completed">
    <div style="width:100%;text-align:center"><i style="color: #78ad25;font-size: 100px;"class="bi bi-envelope-check-fill"></i></div>
    <div style="width:100%;    margin-bottom: 80px;">
      <div class="wrap-comleted title">
        <span>문의 접수완료</span>
      </div>
      <div class="wrap-comleted text">
        마인드웨어웍스 문의를 이용해주셔서 감사합니다.<br>담당자가 빠른 시일내에 연락드리겠습니다.
      </div>
    </div>
  </div>
  `;
  $(".wrap-title").after(completed);
  sendYn = true;
}
/** 오류 발생 화면 */
function errorScreen() {
  let completed = `
  <div class="wrap-completed">
    <div style="width:100%;text-align:center"><i style="color: #d32f2f;font-size: 100px;"class="bi bi-exclamation-triangle-fill"></i></div>
    <div style="width:100%;    margin-bottom: 80px;">
      <div class="wrap-comleted title">
        <span>문의 접수 오류</span>
      </div>
      <div class="wrap-comleted text">
        문의 접수간에 오류가 발생했습니다.
      </div>
    </div>
  </div>
  `;
  $(".wrap-title").after(completed);
  sendYn = true;
}
/** input 필수값 미입력 or 형식에 맞지 않을 때 강조 클래스 추가 */
function showValidate(input) {
  var thisAlert = $(input).parent();
  $(thisAlert).addClass("alert-validate");
}
/** input 강조 클래스 삭제 */
function hideValidate(input) {
  var thisAlert = $(input).parent();
  $(thisAlert).removeClass("alert-validate");
}
/** 스크롤을 제일 아래로 이동시키는 함수*/
function scrollToBottom(id) {
  $("#" + id).scrollTop($("#" + id).prop("scrollHeight"));
}
/** 스크롤 이동  */
function scrollTo(from, to) {
  if ((from, to)) {
    $(from).animate(
      {
        scrollTop:
          $(to).offset().top -
          50 -
          $("#formData").offset().top +
          $("#formData").scrollTop(),
      },
      500
    );
  }
}
/** 로딩 화면 노출 */
function loading(param) {
  if (param == "show") {
    $(".contact2-form").remove(); // form 화면 삭제
    const loading = `<div style="z-index:1;opacity:0.2;" id="fetch-loading"><div class="half-ring"></div></div>`;
    $(".wrap-title").after(loading); // 로딩 화면 show
    $(".close").hide(); // 닫기버튼 hide
  } else if (param == "hide") {
    $("#fetch-loading").remove(); // loading 화면 삭제
    $(".inquiry-frame").show(); // 기존 화면 show
    $(".close").show(); // 닫기버튼 show
  }
}

function zendeskError(){
  var myHeaders = new Headers();
myHeaders.append("coginsight-domain-id", "587fa4a1-192e-4ea4-b733-2e1c9cc28edf");
myHeaders.append("coginsight-api-key", "BkyU7uSRt1MAlioglmsljIU49zRGbFqNU5Rx4sFCxebqUiXPZtHiI1qJIKInQlyOEzTU3swcuRPXRSNkz3yNEQ==|codx5hGV3Rvq79pS6T3prG0Ysbm9PFPzYOFmKBLNhGk=");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "resultCode": "200",
  "resultMessage": "test",
  "email": "sh.park@mindwareworks.com",
  "name": "박세현",
  "site": "mind",
  "title": "title",
  "comment": "test",
  "file": ""
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://stage.coginsight.net/apis/esd/ZENDESK_ERROR/records", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
zendeskError()