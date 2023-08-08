/*
  Mindwareworks Inc.
  2022.06
  ulbii
*/

/*
Event List
  CMD_DEBUG_ONOFF
    : 디버그 온/오프
  CMD_SHOW_POPUP
    : 기본 팝업
  CMD_SEARCH_BRANCH
    : 영업점 찾기
  CMD_SELECT_FINANCIAL_INSTITUTION
    : 금융기관 선택
  CMD_SELECT_TRANSFER_ACCOUNT
    : 이체계좌 선택 -> DATA
  CMD_SELECT_ACCOUNT
    : 전체계좌에서 선택 -> DATA
  CMD_SECURE_PAD
    : 보안키보드
  CMD_EXCHANGE_RATE_GRAPH
    : 환율그래프
  CMD_SELECT_DATE
    : 날짜 선택
  CMD_LINK
    : 링크, 앱링크
  CMD_SEARCH_PICKUP_POINT
    : 환전 수령점 검색
  CMD_SHOW_CALC
    : 계산기
  CMD_REQUEST_LOGIN
    : 로그인 요청
  CMD_ACCOUNT_HISTORY
    : 거래내역
  CMD_INPUT_EMAIL
    : 이메일 입력폼
  CMD_INPUT_PHONE
    : 전화번호 입력폼
  CMD_INPUT_MOBILE
    : 휴대폰 입력폼
  CMD_SELECT_POST_RECEIVE
    : 우편물 수령처 선택
  CMD_HAMBURGER
    : 햅버거메뉴
  CMD_SELECT_LIST
    : 목록 선택
  CMD_SHARE
    : 공유하기
  CMD_INPUT_TRANSFER_LIMIT            
    : 이체한도입력
*/

(function () {
  let initIntervalId = null;

  // css 에 설정된 icon 및 코드정보를 매칭하기 위한 정보
  const bankIcons = [
    [
      { class: "icon_bank_hana", name: "하나", bank_cd: ["080", "081"] },
      { class: "icon_bank_woori", name: "우리", bank_cd: ["020"] },
      { class: "icon_bank_kakao", name: "카카오뱅크", bank_cd: ["090"] },
      { class: "icon_bank_kb", name: "국민", bank_cd: ["004", "006"] },
      { class: "icon_bank_shinhan", name: "신한", bank_cd: ["088"] },
      { class: "icon_bank_ibk", name: "기업", bank_cd: ["003"] },
      { class: "icon_bank_dgb", name: "대구", bank_cd: ["031"] },
      { class: "icon_bank_bnk", name: "부산", bank_cd: ["032"] },
      { class: "icon_bank_bnk", name: "경남", bank_cd: ["039"] },
      { class: "icon_bank_kjb", name: "광주", bank_cd: ["034"] },
      { class: "icon_bank_kjb", name: "전북", bank_cd: ["037"] },
      { class: "icon_bank_jeju", name: "제주", bank_cd: ["035"] },
      { class: "icon_bank_nh", name: "농협", bank_cd: ["010", "011", "012", "013", "014", "015", "018", "019", "020"] },
      { class: "icon_bank_kdb", name: "산업", bank_cd: ["002"] },
      { class: "icon_bank_sh", name: "수협", bank_cd: ["007", "009"] },
      { class: "icon_bank_citi", name: "한국씨티", bank_cd: ["027"] },
      { class: "icon_bank_sc", name: "SC제일", bank_cd: ["023"] },
      { class: "icon_bank_hsbc", name: "HSBC", bank_cd: ["054"] },
      { class: "icon_bank_deutsche", name: "도이치뱅크", bank_cd: ["055"] },
      { class: "icon_bank_boa", name: "BOA", bank_cd: ["060"] },
      { class: "icon_bank_jp", name: "JP모간", bank_cd: ["057"] },
      { class: "icon_bank_icbc", name: "중국공상", bank_cd: ["062"] },
      { class: "icon_bank_bnp", name: "BNP파리바", bank_cd: ["061"] },
      { class: "icon_bank_epost", name: "우체국", bank_cd: ["071", "072", "073", "074", "075"] },
      { class: "icon_bank_kbank", name: "케이뱅크", bank_cd: ["089"] },
      { class: "icon_bank_nfcf", name: "산림조합", bank_cd: ["064"] },
      { class: "icon_bank_fsb", name: "저축은행", bank_cd: ["050"] },
      { class: "icon_bank_kfcc", name: "새마을금고", bank_cd: ["045", "046", "085", "086", "087"] },
      { class: "icon_bank_cu", name: "신협", bank_cd: ["047", "048", "049"] },
      { class: "icon_bank_china", name: "중국", bank_cd: ["063"] },
      { class: "icon_bank_china_const", name: "중국건설", bank_cd: ["067"] },
      { class: "icon_bank_toss", name: "토스뱅크", bank_cd: ["092"] }
    ],
    [
      { class: "icon_stock_hana", name: "하나증권", bank_cd: ["270"] },
      { class: "icon_stock_ipro", name: "교보증권", bank_cd: ["261"] },
      { class: "icon_stock_daish", name: "대신증권", bank_cd: ["267"] },
      { class: "icon_stock_mirae", name: "미래에셋증권", bank_cd: ["230", "238"] },
      { class: "icon_stock_db", name: "DB금융투자", bank_cd: ["279"] },
      { class: "icon_stock_myasset", name: "유안타증권", bank_cd: ["209"] },
      { class: "icon_stock_mertiz", name: "메리츠증권", bank_cd: ["287"] },
      { class: "icon_stock_book", name: "부국증권", bank_cd: ["290"] },
      { class: "icon_stock_samsu", name: "삼성증권", bank_cd: ["240"] },
      { class: "icon_stock_shinyo", name: "신영증권", bank_cd: ["291"] },
      { class: "icon_stock_shinha", name: "신한금융투자", bank_cd: ["278"] },
      { class: "icon_stock_nh", name: "NH투자증권", bank_cd: ["289"] },
      { class: "icon_stock_eugen", name: "유진증권", bank_cd: ["280"] },
      { class: "icon_stock_kiw", name: "키움증권", bank_cd: ["264"] },
      { class: "icon_stock_hiib", name: "하이투자증권", bank_cd: ["262"] },
      { class: "icon_stock_true", name: "한국투자", bank_cd: ["243"] },
      { class: "icon_stock_hanw", name: "한화투자증권", bank_cd: ["269"] },
      { class: "icon_stock_kb", name: "KB증권", bank_cd: ["226"] },
      { class: "icon_stock_ebest", name: "이베스트투자증권", bank_cd: ["265"] },
      { class: "icon_stock_hmsec", name: "현대차증권", bank_cd: ["263"] },
      { class: "icon_stock_cape", name: "케이프증권", bank_cd: ["292"] },
      { class: "icon_stock_sk", name: "SK증권", bank_cd: ["266"] },
      { class: "icon_stock_fossbefore", name: "한국포스증권", bank_cd: ["294"] },
      { class: "icon_stock_ktb", name: "다올투자증권", bank_cd: ["227"] },
      { class: "icon_stock_bnk", name: "BNK투자증권", bank_cd: ["224"] },
      { class: "icon_stock_kakao", name: "카카오페이증권", bank_cd: ["288"] },
      { class: "icon_stock_ibk", name: "IBK투자증권", bank_cd: ["225"] },
      { class: "icon_stock_toss", name: "토스증권", bank_cd: ["271"] },
    ]
  ];

  // 실행 중 예외가 발생할 경우 중단을 피하기 위해 사용
  function safeRun(cb, errCb) {
    try {
      cb && cb();
    } catch (e) {
      Debug.log(e.toString());
      Util.sendMessage("", { from: { logStatus: 'error', payload: e.toString() } });

      errCb && errCb(e);
    }
  }

  // 챗봇 강제종료 실행
  function forceClose() {
    safeRun(() => HanaPartner.closePartnerPopup());
  }

  // 앱 상태바 색상변경 (비활성 상태)
  function setStatusbarColor(color="#000000", bottomColor="#000000") {
    return;
    if (_config.isIOS) {
        safeRun(() => HanaBridge.changePartnerNotchColor(
          color, 
          (data) => Debug.log('> [ OK ] HanaBridge.changePartnerNotchColor(): ', data), 
          (e) => Debug.log('> [ ERROR ] HanaBridge.changePartnerNotchColor(): ', JSON.stringify(e, null, 2)),
          bottomColor
        ))
    }
  }

  // 스플래시 상태에서, status 색상을 _config에 설정된 값 적용, 상대바 색상 설정. setStatusbarColor()을
	// 호출
  function setColor() {
    setStatusbarColor(_config.splashStatusColor, _config.webviewBgColor)
  }

  // 챗봇 진입이 완료된 상태에서, status 색상을 _config에 설정된 값 적용, 상대바 색상 설정.
	// setStatusbarColor()을 호출
  function unsetColor() {
    setStatusbarColor(_config.chatbotStatusColor, _config.webviewBgColor)
  }

  // 챗봇에서 전달된 각종 api url조회, 값은 CMD_SEND_USERKEY를 통해 다이얼로그에서 얻어옴
  function getApiUrl(key) {
    return (_config.urlsToUsingInWrap || {})[key];
  }

  // 웹페이지에서 챗봇객체를 리턴
  function getChatUiFrame() {
    const frameChatbot = document.getElementById("kebhai_chatframe").contentWindow;
    return frameChatbot.document.getElementById("chat-ui-frame-0").contentWindow;    
  }

  // 웹페이지에서 질의입력 엘리먼트를 리턴
  function getInputElement() {
    return (inputElement = getChatUiFrame().document.getElementsByClassName("input-container")[0].getElementsByTagName("input")[0]);
  }

  // 입력에서 마이크 버튼UI를 감춤, 웹 챗봇을 위한 기능
  function hideMicButton() {
    setTimeout(() => {
      $(getChatUiFrame().document)
        .find('div.input-button-container').last().addClass('hidden-mic');
        $(getChatUiFrame().document)
        .find('.hidden-mic>img').last().bind('click', () => false);
    }, 0);
  }

  

  // 포커스를 현재 화면의 타이틀원소 이동. 웹접근성을 위한 기능.
  function focusToTitle() {
    setTimeout(() => {
      if( $('header>h1').length > 1) {
        Debug.log('focus header>h1 title');
        $('header>h1').last().focus();
      } else if( $('.menu_header>h3:visible').length) {
        Debug.log('focus .menu_header>h3:visible title');
        $('.menu_header>h3:visible').last().focus();
      } else if( $('.modal_header>.modal_tit').length) {
        Debug.log('focus .modal_header>.modal_tit title');
        $('.modal_header>.modal_tit').last().focus();
      } else {
        Debug.log('tried focusing header>h1 title');
        $('header>h1').last().focus();
      }        
    }, 100);
  }

  // 생성된 탭UI의 이벤트 연결, tab 요소에 대한 공통 이벤트 핸들러 처리
  function registTabHandler(id, cb) {
    $(`#${id} ul.tab li`).click(function () {
      var activeTab = $(this).attr("data-tab");
      $(`#${id} ul.tab li`).removeClass("is_active");
      $('ul.tab li>a').removeAttr('title');/* 웹접근성 추가 220927 */      
      $(`#${id} .tab_cont`).removeClass("is_active");
      $(this).addClass("is_active");
      $("#" + activeTab).addClass("is_active");
      $('.is_active>a').attr('title','선택됨');/* 웹접근성 추가 220927 */      
      if (cb) {
        cb(activeTab);
      }
    });
  }

  // 포커스를 선택된 탭 이동. 웹접근성을 위한 기능.
  function forceSelectTab(id, activeTab) {
    $(`#${id} ul.tab li`).removeClass("is_active");
    $(`#${id} .tab_cont`).removeClass("is_active");
    $(`#${id} ul.tab li[data-tab=${activeTab}]`).addClass("is_active");
    $("#" + activeTab).addClass("is_active");
  }

  // 시간으로 세션 유효성 체크, 세션 타임아웃 체크
  function validateSessionTimeout() {
    return (
      moment.duration(moment().diff(moment(_config.lastChat))).asMinutes() <=
      _config.chatbotSessionTimeout
    );
  }

  // 현재버전과 요구되는 버전비교
  // 마이크 사용유무를 판단하기 위해 사용
  const isBelowVersion = (req = '', cur = '') => {

    function getMaxIdx() {
      let maxIdx = 0;

      [].forEach.call(arguments, (item) => {
        const value = `${item || ''}`.split('.');
        maxIdx = Math.max(maxIdx, value.length);
      });

      return maxIdx;
    }

    const verToNum = (ver, maxIdx) => {
      let num = 0;

      if (ver) {
        let splitVer = `${ver}`.split('.');
        maxIdx = Math.max(splitVer.length, maxIdx || 0);

        for (let i = 0; i < maxIdx; i++) {
          num += (splitVer[i] || 0) * Math.pow(1000, maxIdx - i - 1);
        }
      }

      return num;
    }

    const maxIdx = getMaxIdx(req, cur);
    const reqValue = verToNum(req, maxIdx);
    const curValue = verToNum(cur, maxIdx);

    return reqValue > curValue;
  }

  // 금융기관 선택을 위한 팝업
  function popupSelectFinancialInstitution(cb) {
    showPopup(
      "금융기관 선택", {
      html: `
        <!-- tab button -->
        <ul class="tab type1">
          <li class="is_active" data-tab="menu11"><a href="#" title="선택됨">은행</a></li>
          <li data-tab="menu12"><a href="#">증권</a></li>
        </ul>
        <!-- tab button -->        
      `,
      init: function (attachId) {
        registTabHandler(attachId);
      },
    }, {
      html: `
        <div id="menu11" class="tab_cont is_active">                            
          <ul class="list type2">
          ${
            bankIcons[0].reduce((accu, item, idx) => accu + `
              <li id="bankitem__${idx}" role="button">
                <a class="${item.class}"}>
                  ${item.name}
                </a>
              </li>
            `, "")
          }
          </ul>
        </div>

        <div id="menu12" class="tab_cont">
          <ul class="list type2">
          ${
            bankIcons[1].reduce((accu, item, idx) => {
              return (accu + `
                <li id="stockitem__${idx}" role="button">
                  <a class="${item.class}"}>
                    ${item.name}
                  </a>
                </li>
              `);
            }, "")
          }
          </ul>
        </div>
      `,
      init: function (attachId) {
        let bankdata = [];

        EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
        EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
          EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
          EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
          ModalBSClose(`#${attachId}`, function () {
            Util.detach(attachId);
          });
        });

        // load bank
        const bankUrl = getApiUrl('bank');
        Debug.log('-----> wrap api (bank): ', bankUrl)

        const origin = Util.getOrigin();

        showLoading();
        fetch(origin + bankUrl)
          .then((response) => response.json())
          .then((data) => {
            bankdata = (data.result || []).map((item) => ({
              bank_cd: item.bank_cd,
              bank_name: item.bank_name,
              bank_rep_name: item.bank_rep_name,
              bank_type: item.bank_type,
              no: item.no,
            }));

            Debug.log("bankdata: ", bankdata);

            hideLoading();
            focusToTitle();
          })
          .catch((e) => {
            Debug.log("bankdata error: ", e.toString())
            Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
          });

        $("li")
          .filter(function () {
            return this.id.match(/^((bank)|(stock))item__/);
          })
          .click(function (event) {
            const target = $(event.delegateTarget);
            const id = target[0].id || "";

            selected = id.split("__");

            const currList = bankIcons[selected[0].match(/^bank/) ? 0 : 1];
            const selectedItem = currList[selected[1]];

            Debug.log("selectedItem: ", selectedItem);

            if (bankdata.length < 1) {
              Debug.log("bankdata not loading still");
              return;
            }

            const selectedData = bankdata.find((item) => {
              return selectedItem.bank_cd.find((cd) => cd == item.bank_cd);
            });

            if (cb) {
              cb(selectedData);
            } else {
              Util.sendMessage("", { from: selectedData });
            }
            EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
          });
      },
    }, false
    );
  }
// 날짜선택 팝업호출
  function popupSelectYearMonth(selected, cb) {
    let swiperYear = {};
    let swiperMonth = {};

    const buf = [0,0,0,0,0];
    const enableYears = ((pastYear) => buf.map((item, idx) => `${parseInt(pastYear)+idx}`))(moment().subtract(buf.length-1, 'year').format('YYYY'))

    showPopup(
      "년월 선택",
      null, 
      {
        html: `
          <div class="picker_list">
            <div class="picker_item">
              <!-- Custom Swiper Area -->
              <div class="ui_swiper swiper_year">
                <!-- Swiper Component -->
                <div class="swiper swiper-container">
                  <dis class="swiper-wrapper">
                  ${
                    enableYears.reduce((accu, item) => accu + `<div class="swiper-slide">${item}년</div>`, '')
                  }
                  </dis>
                </div>
                <!-- // Swiper Component -->
              </div>
              <!-- // Custom Swiper Area -->
            </div>
            <div class="picker_item">
              <!-- Custom Swiper Area -->
              <div class="ui_swiper swiper_month">
                <!-- Swiper Component -->
                <div class="swiper swiper-container">
                  <dis class="swiper-wrapper">
                  ${
                    (()=> {
                      let buf = '';
                      for(let i = 1; i <= 12; i++) {
                        buf += `<div class="swiper-slide">${`${i}`.padStart(2, '0')}월</div>`;
                      }
                      return buf;
                    })()
                  }
                  </dis>
                </div>
                <!-- // Swiper Component -->
              </div>
              <!-- // Custom Swiper Area -->
            </div>
          </div>      
        `,
        init: function (attachId) {
          EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
          EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
            EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
            EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
            ModalBSClose(`#${attachId}`, function () {
              Util.detach(attachId);
            });
          });

          var swierPicker = {
            initialSlide: enableYears.reduce((accu, item, idx) => (accu[item] = idx, accu), {})[selected.year] || 0,
            threshold: 3,
            speed:300,
            // freeMode: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            slideToClickedSlide: true,
            direction: "vertical",
            resistanceRatio: false,
            on: {
              init: function(swiper){
                // Swiper가 적용되면 보여주도록 대응
                $(swiper.$el).closest('.ui_swiper').addClass('is_swiper');
              }
            }
          }
          var swiperMonthParam = {loop:true}
          $.extend(swiperMonthParam, swierPicker);
          swiperMonthParam.initialSlide = selected.month;
          swiperYear = new Swiper(".swiper_year .swiper-container", swierPicker);
          swiperMonth = new Swiper(".swiper_month .swiper-container", swiperMonthParam);        
        },
        dimmer: true,
      },
      true,
      {
        html: `
          <!-- button_bottom -->
          <div class="button_bottom">
            <button type="button">확인</button>
          </div>
          <!-- // button_bottom -->
        `,
        init: function (attachId) {
          $(".button_bottom").click(() => {
            if (cb) {
              cb(parseInt(enableYears[swiperYear.activeIndex]), swiperMonth.activeIndex % 12);
            }

            EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
          });
        },
      }
    );
  }  

  const Handler = {
    Cmd: function (cmd, next) {
      this._cmd = cmd;
      this._next = next;

      this.act = function (msgObj) {
        if (this._cmd === msgObj.command) {
          setTimeout(() => this.toAct(msgObj), 0);
        } else if (next != undefined) {
          next.act(msgObj);
        } else {
          Debug.log("CMD_ ingnored: ", JSON.stringify(msgObj, null, 2));
        }
      };
    },

    // CMD_DEBUG_ONOFF : 디버그 온/오프 
    // ---------------------------------------------------------------------------------------
    CmdDebugOnOff: function (next) {
      Handler.Cmd.apply(this, ["CMD_DEBUG_ONOFF", next]);

      this.toAct = function (msgObj) {
        _config.isDebug = msgObj.data.debug == "debugOn";
        Debug.isOk = _config.isDebug;

        Util.sendMessage(`debug mode is ${_config.isDebug ? "ON" : "OFF"}`);
      };
    },

    // CMD_SHOW_POPUP : 기본 팝업 호출
    // ---------------------------------------------------------------------------------------
    CmdShowPopup: function (next) {
      Handler.Cmd.apply(this, ["CMD_SHOW_POPUP", next]);

      this.toAct = function (msgObj) {
        const title = (msgObj.data || {}).title || "알림 팝업";
        const descript = (msgObj.data || {}).descript;
        const buttons = (msgObj.data || {}).buttons;

        showPopup(
          '기본팝업' || title,
          null,
          {
            html: `
              <div class="chat_basic">
                <div class="text_basic">
                  <div class="chat_description">${descript || ""}</div>
                </div>            
                ${
                  buttons && Array.isArray(buttons)
                  ? `
                    <div class="button_inner">
                      ${
                        (buttons || []).reduce((accu, item) => {
                          return accu + `<button type="button">${item}</button>`;
                        }, "")
                      }
                    </div>                
                  `
                  : ''
                }
              </div>                                
            `,
            init: function (attachId) {
              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });
            },
          },
          true
        );
      };
    },

    // CMD_SEARCH_BRANCH : 영업점 찾기 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdSearchBranch: function (next) {
      Handler.Cmd.apply(this, ["CMD_SEARCH_BRANCH", next]);

      const BRANCH_TYPE = {
        CDATM: "점외자동화",
        MAGIC_BANK: "매직뱅크",
        BRANCH: "지점",
        EPOST: "우체국",
        BRAND_ATM: "브랜드ATM",
      };

      const order = {};
      order[BRANCH_TYPE.BRANCH] = 1;
      order[BRANCH_TYPE.CDATM] = 2;
      order[BRANCH_TYPE.MAGIC_BANK] = 3;
      order[BRANCH_TYPE.BRAND_ATM] = 4;
      order[BRANCH_TYPE.EPOST] = 5;

      const update = function (attachId, data) {
        let html = "";
        if (((data || {}).list || []).length > 0) {
          const list = data.list.map((item, index) => {
            return `
              <li id="branchitem__${index}" role="button">
                <a href="#none">
                  <div class="branch">
                    <p>
                      ${item.name}
                    ${
                      item.branch_type === BRANCH_TYPE.BRANCH || item.branch_type === BRANCH_TYPE.MAGIC_BANK
                        ? BRANCH_TYPE.BRANCH
                        : ""
                    }
                    </p>
                    ${
                      item.branch_type !== BRANCH_TYPE.BRANCH && item.branch_type !== BRANCH_TYPE.MAGIC_BANK
                        ? "<span>ATM</span>"
                        : ""
                    }
                  </div>
                  <div class="address">
                    ${item.address}
                  </div>
                </a>
              </li>
            `;
          });

          html = `        
            <!-- 검색결과 list -->
            <ul class="search_result_list">
              ${list.join("")}
            </ul>
            <!-- 검색결과 list -->    
          `;

          $(".text_total").show();
          $("#text_total__count").html(list.length.toLocaleString());
        } 
        else {
          html = `
            <div class="no_data">
              찾으시는 결과가 없습니다.<br />영업점 또는 지역명으로 다시 검색해주세요
            </div>
          `;
          $(".text_total").hide();
        }

        $(".modal>.modal_content").html(html);
        $(".modal_content .search_result_list li").click(function (event) {
          const target = $(event.delegateTarget);
          id = target[0].id || "";
          if (id.match(/branchitem__/)) {
            const idx = id.replace(/branchitem__/, "");
            const item = data.list[idx];
            Util.sendMessage(item.name + (item.branch_type || ""), {
              from: item,
            });
            EventEmitter.dispatch("EVT_OK_POPUP" + attachId, attachId);
          }
        });
      };

      const load = async function (keyword) {
        if (!validateSessionTimeout()) {
          Debug.log("chatbot session timeout");
          return;
        }

        const branchSearchUrl = getApiUrl('branchSearch');
        Debug.log('-----> wrap api (branchSearch): ', branchSearchUrl);

        let data = null;
        const api = branchSearchUrl;

        showLoading();
        try {
          const response = await fetch(api + encodeURIComponent(keyword || ""));
          data = await response.json();
        } catch (e) {
          Debug.log("ERR load branch: ", e.toString());
          Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
        }

        hideLoading();

        if (((data || {}).list || []).length > 0) {
          let dataList = data.list.reduce((accu, item) => {
            if (accu.findIndex((v) => v.id === item.id) === -1) {
              item.order = order[item.branch_type];
              if (item.order === order[BRANCH_TYPE.BRANCH]) {
                if (keyword && (item.name || "").indexOf(keyword) > -1) {
                  item.order = 0;
                }
              }
              accu.push(item);
            }
            return accu;
          }, []);

          data.list = dataList.sort((a, b) => a.order - b.order);
        }
        
        Debug.log("data: ", data);

        return data;
      };

      const requestList = async function (attachId, keyword) {
        const data = await load(keyword || "");
        update(attachId, await data);
      };

      const search = async function (attachId) {
        const val = $(".search_wrap input").val();
        if ((val || "").length > 0) {
          requestList(attachId, val);
        }
      };

      this.toAct = function (msgObj) {
        showPopup(
          "영업점 선택",
          {
            descript: "지점명 또는 지역을 입력해주세요",
            html: `
              <!-- search_wrap -->
              <div class="search_wrap">
                <input type="text" placeholder="지점명 또는 지역을 입력해주세요" />
                <button type="button"><span class="blind" disabled="disabled">검색</span></button>
              </div>
              <!-- // search_wrap -->
              <!-- // 총 건수 -->
              <p class="text_total">총 <span id="text_total__count">0</span>건</p>
              <!-- // 총 건수 -->
            `,
            init: function (attachId) {
              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                Util.sendMessage("", {});
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });
              EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
              EventEmitter.subscribe("EVT_OK_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });

              $(".search_wrap input").on("keyup", function (key) {
                if (key.keyCode == 13) {
                  search(attachId);
                }
              });

              $(".search_wrap input").on("input", function () {
                const val = $(this).val() || "";
                if (val.length > 0) {
                  $(".search_wrap button").removeAttr("disabled");
                } else {
                  $(".search_wrap button").attr("disabled", "disabled");
                }
              });

              $(".search_wrap button").click(function () {
                search(attachId);
              });

              const keyword = (msgObj.data || {}).keyword;
              $(".search_wrap input").val(keyword || "");
              if ((keyword || "").length > 0) {
                $(".search_wrap button").removeAttr("disabled");
              }

              requestList(attachId, keyword);
            },
          },
          {
            html: ``,
            init: function (attachId) { },
          },
          false
        );
      };
    },

    // CMD_SELECT_FINANCIAL_INSTITUTION : 금융기관 선택 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdSelectFinancialInstitution: function (next) {
      Handler.Cmd.apply(this, ["CMD_SELECT_FINANCIAL_INSTITUTION", next]);

      this.toAct = function (msgObj) {
        popupSelectFinancialInstitution();
      };
    },

    // CMD_SELECT_TRANSFER_ACCOUNT : 이체계좌 선택 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdSelectTransferAccount: function (next) {
      Handler.Cmd.apply(this, ["CMD_SELECT_TRANSFER_ACCOUNT", next]);

      let selectedBank = {
        ACCT_NO: null,
        bank_cd: "081",
        bank_name: "하나은행",
      };

      let accountBalance = 0;
      let accountBalancePer1day = 0;

      function isValid(value, type) {
        const val = Util.getNumber(value);

        if (type == "계좌번호") {
          value = value.replace(/-/g, "");
          return !isNaN(value) && value.length > 5 && value.length < 19;
        } else if (type == "금액 (1일 한도 3백만원)") {
          const val = Util.getNumber(value);
          return (
            !isNaN(val) &&
            val > 0 &&
            val <= 3000000 &&
            (
              (accountBalanceLimitPer1day == 0 &&
              val <= accountBalancePer1day) ||
              val <= Math.min(accountBalancePer1day, accountBalanceLimitPer1day)
            )
          );
        }

        return false;
      }

      this.toAct = function (msgObj) {

        Debug.log("- accounts - ", msgObj.data);

        selectedBank = {
          ACCT_NO: null,
          bank_cd: "081",
          bank_name: "하나은행",
        };

        let group = (msgObj.data || {}).group || "직접입력";
        const financial = (msgObj.data || {}).financial;

        let recent = (msgObj.data || {}).recent;
        if (recent) {
          recent = recent.reduce((accu, item) => {
            if (!accu.find((obj) => obj.ACCT_NO === item.ACCT_NO && obj.BNK_CD === item.BNK_CD)) {
              accu.push(item);
            }
            return accu;
          }, []);
        }

        let favorite = (msgObj.data || {}).favorite;
        if (favorite) {
          favorite = favorite.reduce((accu, item) => {
            if ( !accu.find((obj) => obj.RCV_ACCT_NO === item.RCV_ACCT_NO && obj.RCV_BNK_CD === item.RCV_BNK_CD)) {
              accu.push(item);
            }
            return accu;
          }, []);
        }

        const mine = (msgObj.data || {}).mine;
        const account = (msgObj.data || {}).account || {};
        const cancelMsg = (msgObj.data || {}).cancelMsg || {};
        accountBalance = parseInt(account.ACCT_BAL || "0");
        accountBalancePer1day = parseInt(account.PAYM_BAL || "0");
        accountBalanceLimitPer1day = parseInt((account.limitInfo || {}).TRNS_POSS_LIM_AMT || "0");

        Debug.log("financial: ", financial);
        Debug.log("recent: ", recent);
        Debug.log("favorite: ", favorite);
        Debug.log("mine: ", mine);
        Debug.log("account: ", account);

        if (!recent && !favorite) {
          if (!mine || mine.length === 0) {
            Util.sendMessage("정보가 없습니다.");
            return;
          } else {
            group = "내계좌";
          }
        }
        
        function getBankName(bankCd) {
          const finObj = financial.find((item) => item.bank_cd == bankCd) || {};
          return finObj.bank_name || "";
        }

        function isHana(account) {
          return (
            account.BNK_CD == "081" ||
            account.RCV_BNK_CD == "081" ||
            account.mine
          );
        }

        function makeList(name, list) {
          return (list || []).length > 0
            ? list.reduce((accu, item, idx) => {
              return (accu + `
                <li id="${name}_item_${idx}" role="button">
                  <a>
                    <strong>${item.PRD_NM || item.RMTE_NM || item.PSBK_RMRK || item.OWAC_NM || item.bank_name || ""}</strong>
                    ${getBankName(item.BNK_CD || item.RCV_BNK_CD)} 
                    ${
                      isHana(item)
                        ? Util.fmtAccountNo(item.ACCT_NO || item.RCV_ACCT_NO)
                        : item.ACCT_NO || item.RCV_ACCT_NO
                    }
                  </a>
                </li>
                `
              );
            }, "")
            : `
              <div class="no_data no_border">
                계좌가 없습니다.
              </div>
            `;
        }

        showPopup(
          "이체계좌 입력",
          {
            html: `
              <ul class="tab type1">
                <li ${group == "직접입력" ? 'class="is_active"' : ""} data-tab="menu0"><a href="#" title="선택됨">직접입력</a></li>
                <li ${group == "최근" ? 'class="is_active"' : ""} data-tab="menu1"><a href="#">최근</a></li>
                <li ${group == "자주" ? 'class="is_active"' : ""} data-tab="menu2"><a href="#">자주</a></li>
                <li ${group == "내계좌" ? 'class="is_active"' : ""} data-tab="menu3"><a href="#">내계좌</a></li>
              </ul>
            `,
            init: function (attachId) {
              registTabHandler(attachId, (tab) => {
                const inputAccount = $(".modal_content .input_clear input").eq(0);
                const inputAmount = $(".modal_content .input_clear input").eq(1);
                inputAccount.blur();
                inputAmount.blur();

                const idx = tab.replace("menu", "") - 1;
                if (idx >= 0) {
                  const list = [recent, favorite, mine][idx];
                  Debug.log("curr tab list:", list);
                }
              });
            },
          },
          {
            html: `                    
              <div id="menu0" class="tab_cont ${group == "직접입력" ? "is_active" : ""}">
                <ul class="form_list">
                  <li class="account">
                    <div class="button_inner_account">

                    <!--
                      <button type="button" readonly="readonly">
                        <p>출금계좌</p>
                        ${account.PRD_NM || ""} : ${Util.toAccountString(account.ACCT_NO || "")}
                      </button>
                    -->
                      <div class="info">
                        <p>출금계좌</p>
                        ${account.PRD_NM || ""} : ${Util.toAccountString(account.ACCT_NO || "")}
                      </div>

                    </div>
                    <div class="text_wrap_style1">
                      <p>${account.BNK_TRNS_LIM ? '금융거래한도계좌' : ''}</p>
                      <span>
                        잔액 ${accountBalance.toLocaleString()}원<br />
                        출금가능잔액 ${accountBalancePer1day.toLocaleString()}원
                      </span>
                    </div>
                    <p class="mar2">* 하이챗봇 금일 이체가능 한도 <span class="text_style1"><strong>${accountBalanceLimitPer1day.toLocaleString()}</strong>원</span></p>
                  </li>
                  <li>
                    <div class="button_inner_account">
                      <button type="button" title="금융기관 선택">                            
                        하나은행
                      </button>
                    </div>
                    <div class="input_clear">
                      <input type="text" pattern="\d*" inputmode="numeric" title="계좌번호" placeholder="계좌번호">  
                      <button type="button" class="clear_btn" style="visibility: hidden"><span class="blind">삭제</span></button>
                    </div>                    
                    <div class="input_clear">
                      <input type="text" pattern="[\d,원]*" inputmode="numeric" title="금액 (1일 한도 3백만원)" placeholder="금액 (1일 한도 3백만원)">    
                      <button type="button" class="clear_btn" style="visibility: hidden"><span class="blind">삭제</span></button>
                    </div>                               
                  </li>
                </ul>    
              </div>
      
              <div id="menu1" class="tab_cont ${group == "최근" ? "is_active" : ""}">
                <ul class="list type1">
                  ${makeList("recent", recent)}
                </ul>
              </div>

              <div id="menu2" class="tab_cont ${group == "자주" ? "is_active" : ""}">
                <ul class="list type1">
                  ${makeList("favorite", favorite)}
                </ul>
              </div>
      
              <div id="menu3" class="tab_cont ${group == "내계좌" ? "is_active" : ""}">
                <ul class="list type1">
                  ${makeList("mine", mine)}
                </ul>
              </div>
            `,
            init: function (attachId) {
              const inputAccount = $(".modal_content .input_clear input").eq(0);
              const inputAmount = $(".modal_content .input_clear input").eq(1);

              function checkAbleButton() {
                if (isValid(inputAccount.val(), inputAccount.attr("title"))) {
                  inputAccount.removeClass("error");
                  inputAccount.addClass("is_active");
                } else {
                  inputAccount.removeClass("is_active");
                  inputAccount.addClass("error");
                }

                if (isValid(inputAmount.val(), inputAmount.attr("title"))) {
                  inputAmount.removeClass("error");
                  inputAmount.addClass("is_active");
                } else {
                  inputAmount.removeClass("is_active");
                  inputAmount.addClass("error");
                }

                const isEnable = isValid(inputAccount.val(), inputAccount.attr("title")) && 
                                isValid(inputAmount.val(), inputAmount.attr("title"));
                $(".button_bottom button").attr("disabled", !isEnable);
              }

              // 목록에서 계좌 선택시 처리
              $("li")
                .filter(function () {
                  return this.id.match(/^((recent)|(favorite)|(mine))_item_/);
                })
                .click(function (event) {
                  const target = $(event.delegateTarget);
                  const id = target[0].id || "";

                  const tmps = id.split("_");
                  const kind = tmps[0];
                  const idx = tmps[2];
                  const item = {
                    recent: recent,
                    favorite: favorite,
                    mine: mine,
                  }[kind][idx];

                  selectedBank = {
                    ...item,
                    bank_cd: item.BNK_CD || item.RCV_BNK_CD || "081",
                  };
                  selectedBank.bank_name = getBankName(selectedBank.bank_cd) || "은행명 없음";

                  Debug.log("selectedBank: ", selectedBank);

                  $(".button_inner_account button")
                    .eq(0)
                    .html(selectedBank.bank_name);
                  $(".input_clear input")
                    .eq(0)
                    .val(selectedBank.ACCT_NO || selectedBank.RCV_ACCT_NO);
                  inputAmount.val("");
                  checkAbleButton();
                  forceSelectTab(attachId, "menu0");
                });

              inputAccount.on("keyup", function (key) {
                if (key.keyCode == 13) {
                  inputAccount.blur();
                  return;
                }

                if (isNaN((inputAccount.val() || "").replace(/-/g, ""))) {
                  inputAccount.val("");
                }

                checkAbleButton();
              });

              inputAccount.on("change", function () {
                checkAbleButton();
              });

              inputAccount.on("focus", function () {
                $(this).val($(this).val().replace(/-/g, ""));
              });

              inputAccount.on("focusout", function () {
                Debug.log("focusout");
                inputAmount.focus();
              });

              inputAccount.on("blur", function () {
                let acct = $(this).val();
                if (acct) {
                  $(this).val(acct);
                }

                checkAbleButton();
              });

              // 금액입력 처리
              inputAmount.on("keyup", function (key) {
                if (key.keyCode == 13) {
                  inputAmount.blur();
                  return;
                }

                Util.updateTextView($(this));
                checkAbleButton();
              });

              inputAmount.on("change", function () {
                checkAbleButton();
              });

              inputAmount.on("focus", function () {
                Debug.log("focus");
                $(this).val($(this).val().replace(/원/, ""));
              });

              inputAmount.on("blur", function () {
                $(this).val($(this).val() ? $(this).val() + "원" : "");
                checkAbleButton();
              });

              // 금융기관 선택버튼
              $(".button_inner_account button")
                .eq(0)
                .click(() => {
                  inputAccount.blur();
                  inputAmount.blur();

                  checkAbleButton();
                  popupSelectFinancialInstitution((selectedData) => {
                    Debug.log("selected: ", selectedData);
                    selectedBank = selectedData;
                    $(".button_inner_account button")
                      .eq(0)
                      .html((selectedBank || {}).bank_name || "");
                    $(".input_clear input").eq(0).val("");
                    inputAmount.val("");
                    inputAccount.focus();
                  });
                });
            },
          },
          520,
          {
            html: `
              <!-- button_bottom -->
              <div class="button_bottom">
                <button type="button" disabled="disabled">확인</button>
              </div>
              <!-- // button_bottom -->
            `,
            init: function (attachId) {
              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                Util.sendMessage(cancelMsg || "", {});
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });
              EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
              EventEmitter.subscribe("EVT_OK_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });

              // 입력하기 버튼
              $(".button_bottom").click(() => {
                Debug.log("ok: ", attachId);

                selectedBank.ACCT_NO = (
                  $(".input_clear input").eq(0).val() || ""
                ).replace(/-/g, "");

                Util.sendMessage("", {
                  from: {
                    transferTarget: selectedBank,
                    transferAmount: parseInt(($(".input_clear input").eq(1).val() || "").replace(/,|원/g, "")),
                  },
                });

                EventEmitter.dispatch("EVT_OK_POPUP" + attachId, attachId);
              });
            },
          }
        );
      };
    },

    // CMD_SELECT_ACCOUNT : 전체계좌에서 선택 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdSelectAccount: function (next) {
      Handler.Cmd.apply(this, ["CMD_SELECT_ACCOUNT", next]);

      let receivedAccountMsg = null;

      this.toAct = function (msgObj) {
        const accounts = (msgObj.data || {}).accounts || [];
        let group = (msgObj.data || {}).group || "입출금";
        group = group === "예적금/신탁" ? "예금/신탁" : group;
        group = ["입출금", "예금/신탁", "펀드", "대출", "외화"].find((item) => item === group)
          ? group
          : "입출금";

        receivedAccountMsg = (msgObj.data || {}).receivedAccountMsg;
        const strDt = (msgObj.data || {}).strDt;
        const endDt = (msgObj.data || {}).endDt;

        const withdraws = accounts.filter((item) => item.ACCT_TYP_CD == "01");
        const deposits = accounts.filter((item) =>
          Boolean(["02", "03", "11", "05", "12"].find((v) => v == item.ACCT_TYP_CD))
        );
        const funds = accounts.filter((item) => item.ACCT_TYP_CD == "07");
        const loans = accounts.filter((item) =>
          Boolean(["08", "13"].find((v) => v == item.ACCT_TYP_CD))
        );
        const forexs = accounts.filter((item) => item.ACCT_TYP_CD == "06");

        if (accounts.length === 0) {
          Util.sendMessage("정보가 없습니다.");
          return;
        }

        function makeList(name, list) {
          Debug.log("name: ", name);
          return (list || []).length > 0
            ? list.reduce((accu, item, idx) => {
                return (accu + `
                    <li id="${name}_item_${idx}" role="button">
                      <a href="#none">
                        ${
                          name === "withdraws" || name === "forexs"
                            ? `
                              <div class="account_info${name === "withdraws" ? " min_height1" : ""}">
                                <strong>${item.PRD_NM}</strong>
                                <p>${Util.fmtAccountNo(item.ACCT_NO)}</p>
                              </div>
                              <div class="amount">
                                ${
                                  name === "forexs"
                                    ? `${item.CUR_CD} <strong>${parseFloat(item.ACCT_BAL).toLocaleString(undefined, {maximumFractionDigits: 2,minimumFractionDigits: 2})}</strong>`
                                    : `<strong>${parseInt(item.ACCT_BAL).toLocaleString()}</strong>원`
                                }
                              </div>
                            `
                            : `
                              <div class="account_info">
                                <strong>${item.PRD_NM}</strong>
                                <p>${Util.fmtAccountNo(item.ACCT_NO)}</p>
                                ${
                                  item.EXPI_DT
                                    ? `<p>만기일 ${moment(item.EXPI_DT).format("YYYY.MM.DD")}</p>`
                                    : ""
                                }
                              </div>
                              <div class="amount">
                                ${item.CUR_CD == "KRW" ? "" : item.CUR_CD}
                                <strong>${parseInt((name == "funds" ? item.FUND_ASES_AMT : item.ACCT_BAL) || 0).toLocaleString()}</strong>
                                ${item.CUR_CD == "KRW" ? "원" : ""}
                                <p>${item.ACCT_TYP_NM}</p>    
                              </div>
                            `
                        }
                      </a>                                
                    </li>
                `);
              }, "")
            : `
              <div class="no_data no_border">
                  계좌가 없습니다.
              </div>
          `;
        }
	
        showPopup(
          "전체계좌",
          {
            descript: "계좌를 선택해 주세요.",
            html: `
              ${
                strDt && endDt
                  ? `
                    <p class="modal_desp text_style1">
                        조회기간 ${moment(strDt).format("YYYY.MM.DD")} ~ ${moment(endDt).format("YYYY.MM.DD")}
                    </p>`
                  : ""
              }
              <ul class="tab type1">
                <li ${group == "입출금" ? 'class="is_active"' : ""} data-tab="menu1"><a href="#" ${group == "입출금" ? 'title="선택됨"' : ""}>입출금</a></li>
                <li ${group == "예금/신탁" ? 'class="is_active"' : ""} data-tab="menu2"><a href="#" ${group == "예금/신탁" ? 'title="선택됨"' : ""}>예금/신탁</a></li>
                <li ${group == "펀드" ? 'class="is_active"' : ""} data-tab="menu3"><a href="#" ${group == "펀드" ? 'title="선택됨"' : ""}>펀드</a></li>
                <li ${group == "대출" ? 'class="is_active"' : ""} data-tab="menu4"><a href="#" ${group == "대출" ? 'title="선택됨"' : ""}>대출</a></li>
                <li ${group == "외화" ? 'class="is_active"' : ""} data-tab="menu5"><a href="#" ${group == "외화" ? 'title="선택됨"' : ""}>외화</a></li>
              </ul>
            `,
            init: function (attachId) {
              registTabHandler(attachId, (tab) => {
                const idx = tab.replace("menu", "") - 1;
                const list = [withdraws, deposits, funds, loans, forexs][idx];
                Debug.log("curr tab list:", list);
              });
            },
          },
          {
            html: `                    
              <div id="menu1" class="tab_cont ${group == "입출금" ? "is_active" : ""}">
                <ul class="list type4">
                  ${makeList("withdraws", withdraws)}
                </ul>
              </div>
              <div id="menu2" class="tab_cont ${group == "예금/신탁" ? "is_active" : ""}">
                <ul class="list type4">
                  ${makeList("deposits", deposits)}
                </ul>
              </div>
              <div id="menu3" class="tab_cont ${group == "펀드" ? "is_active" : ""}">
                <ul class="list type4">
                  ${makeList("funds", funds)}
                </ul>
              </div>
              <div id="menu4" class="tab_cont ${group == "대출" ? "is_active" : ""}">
                <ul class="list type4">
                  ${makeList("loans", loans)}
                </ul>
              </div>
              <div id="menu5" class="tab_cont ${group == "외화" ? "is_active" : ""}">
                <ul class="list type4">
                  ${makeList("forexs", forexs)}
                </ul>
              </div>                            
            `,
            init: function (attachId) {
              const items = {
                withdraws: withdraws,
                deposits: deposits,
                funds: funds,
                loans: loans,
                forexs: forexs,
              };

              $("li")
                .filter(function () {
                  return this.id.match(/^((withdraws)|(deposits)|(funds)|(loans)|(forexs))_item_/);
                })
                .click(function (event) {
                  const target = $(event.delegateTarget);
                  const id = target[0].id || "";

                  const tmps = id.split("_");
                  const kind = tmps[0];
                  const idx = tmps[2];
                  const item = items[kind][idx];

                  let msg = "";
                  if (receivedAccountMsg) {
                    msg = `${Util.fmtAccountNo(item.ACCT_NO)} ${receivedAccountMsg}`;
                  }
                  Util.sendMessage(msg, { from: item });
                  EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
                });
            },
          },
          false
        );
      };
    },

    // CMD_SECURE_PAD : 보안키보드 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdSecurePad: function (next) {
      Handler.Cmd.apply(this, ["CMD_SECURE_PAD", next]);

      this.toAct = function (msgObj) {

        const securePadUrl = getApiUrl('securePad');
        Debug.log('-----> wrap api (securePadUrl): ', securePadUrl);

        const origin = Util.getOrigin();
        const url = origin + securePadUrl + "?accessToken=" + encodeURIComponent(msgObj.data.accessToken || "");

        showPopup(
          null, 
          null, 
          {
            html: `
              <iframe id="kebhai_securepadframe"></iframe>
            `,
            init: function (attachId) {
              $(".modal_wrap>.modal").removeClass("modal_search");
              $(".modal_wrap>.modal").addClass("modal_password");
              $(".modal_content").css({ padding: "0px", overflow: "hidden" });

              const eventHandler = function (event) {
                let data = null;
                try {
                  data = JSON.parse(event.data || "");
                } catch (e) {
                  Debug.log("securepad error: ", e.toString());
                }

                Debug.log("securepad result: ", data);

                if (data.resultCode == "200") {
                  Util.sendMessage("", { from: "INPUT_PASSWORD_OK" });
                } else {
                	// data.resultCode = 500002, resultMessage=password value is
					// empty (보안키패드 빈 공간 눌렀을 경우)
                  Debug.log("INPUT_PASSWORD_FAIL");
                  Util.sendMessage("", { from: "INPUT_PASSWORD_FAIL" });
                }
                EventEmitter.dispatch("EVT_CLOSE_SECUREPAD" + attachId);
              };

              EventEmitter.subscribe("EVT_CLOSE_SECUREPAD" + attachId, () => {
                EventEmitter.unsubscribe("EVT_CLOSE_SECUREPAD" + attachId);
                window.removeEventListener("message", eventHandler);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });

              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                window.removeEventListener("message", eventHandler);
                ModalBSClose(`#${attachId}`, function () {
                  Util.sendMessage("", { from: "INPUT_PASSWORD_CANCEL" });
                  Util.detach(attachId);
                });
              });

              window.addEventListener("message", eventHandler);

              setTimeout(() => {
                Debug.log("load securepad : ", url);
                $("#kebhai_securepadframe").attr("src", url);
              }, 0);
            },
          }
        );
      };
    },

    // CMD_EXCHANGE_RATE_GRAPH : 환율그래프 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdExchangeRateGraph: function (next) {
      Handler.Cmd.apply(this, ["CMD_EXCHANGE_RATE_GRAPH", next]);

      let payload = {};
      let datas = {};

      const load = async function (payload, past) {
        let data = null;
        const origin = Util.getOrigin();

        const exhgRtCurUrl = getApiUrl('exhgRtCur');
        const exhgRtCurResultAttr = getApiUrl('exhgRtCurResultAttr');
        Debug.log('-----> wrap api (exhgRtCur): ', exhgRtCurUrl);
        Debug.log('-----> wrap api (exhgRtCurResultAttr): ', exhgRtCurResultAttr);

        const api = origin + exhgRtCurUrl;

        Debug.log("api: ", api);
        Debug.log("payload: ", payload);

        if (!validateSessionTimeout()) {
          Debug.log("chatbot session timeout");
          return;
        }

        showLoading();
        try {
          const response = await fetch(api, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "hai-request-guid": (payload || {}).guid,
              "hai-service-group": "CNA",
              "hai-access-channel": "MBP",
              "hai-device-ipv6adr": (payload || {}).clientIp,
              "hai-device-macadr": (payload || {}).clientMac,
              "hai-dialog-session-id": (payload || {}).sessionId,
            },
            body: JSON.stringify({
              inqStrDt: past.format("YYYYMMDD"),
              inqEndDt: moment().format("YYYYMMDD"),
              curCd: (payload || {}).cur_cd,
            }),
          });
          data = await response.json();
        } catch (e) {
          Debug.log("ERR load branch: ", e.toString());
          Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
        }
        
        hideLoading();
        focusToTitle();

        let list = ((data || {}).pbkpfxlist || {})[exhgRtCurResultAttr] || [];
        list = list.map((item) => ({
          REG_DT: item.REG_DT,
          DEAL_BASC_RT: parseFloat(item.DEAL_BASC_RT),
        }));

        return list;
      };

      async function updateChart(tab) {
        Debug.log("update chart:", tab);

        const idx = tab.replace("menu", "") - 1;
        const range = [1, 3, 12];
        const past = moment().subtract(range[idx] + "", "month");

        if (payload.dummy) {
          datas[idx] = payload.dummy;
        }

        if (!datas[idx]) {
          datas[idx] = await load(payload, past);
          Debug.log("graph data: ", datas[idx]);
          if (!datas[idx]) {
            return;
          }
        }

        const chartData = {
          name: "",
          data: datas[idx].map((item) => [
            moment(item.REG_DT).utc().valueOf(),
            item.DEAL_BASC_RT,
          ]),
          showInLegend: false,
          lineColor: "#6F5DD8",
          lineWidth: 1,
          color: "#6F5DD8",
          fillOpacity: 0.1,
        };

        const title = `${moment().format("YYYY-MM-DD, HH:mm")} 기준`;
        let config = {
          chart: { type: "area" },
          title: { text: "환율 추이" },
          subtitle: { text: title },
          yAxis: {
            title: { text: "Exchange Rate" },
            min: Math.floor(Math.min(...datas[idx].map((item) => item.DEAL_BASC_RT)) / 10) * 10 - 10,
            max: Math.floor(Math.max(...datas[idx].map((item) => item.DEAL_BASC_RT)) / 10) * 10 + 10,
          },
          xAxis: {
            type: "datetime",
            dateTimeLabelFormats: {
              month: "%e. %b",
              year: "%b",
            },
          },
          tooltip: {
            formatter: function () {
              return `
                <span style="font-size:11px;">
                  ${moment(this.x).format("dddd,MMM DD")} 15:00
                </span>
                <br/>
                <b>
                  <span style="color:#6F5DD8;">&#10625</span>원${(payload || {}).cur_cd || '달러'} 환율: ${parseInt(this.y)}
                </b>
              `;
            },
            shared: true,
            backgroundColor: "#FFFFFF",
            borderColor: "#6F5DD8",
            borderRadius: 5,
            borderWidth: 1,
          },
          exporting: {
            enabled: false,
          },
          plotOptions: {
            series: {
              label: { connectorAllowed: false },
            },
          },
          series: [chartData],
          accessibility: {
            enabled: false
          }
        };

        const chartObj = new Highcharts.chart(
          "chart_container" + (idx + 1),
          config
        );

        setTimeout(() => {
          $(".highcharts-credits").hide();
        });
      }

      this.toAct = function (msgObj) {
        datas = {};

        showPopup(
          "환율 그래프",
          {
            descript: "기간별 환율 추이를 확인해 보세요!",
            html: `
              <ul class="tab type1">
                <li class="is_active" data-tab="menu1"><a href="#" title="선택됨">1개월</a></li>
                <li data-tab="menu2"><a href="#">3개월</a></li>
                <li data-tab="menu3"><a href="#">12개월</a></li>
              </ul>
            `,
            init: function (attachId) {
              registTabHandler(attachId, (tab) => {
                updateChart(tab);
              });
            },
          },
          {
            html: `
              <div style="min-height:516px;">
                <div id="menu1" class="tab_cont is_active">                                
                  <figure class="highcharts-figure">
                    <div id="chart_container1" role="img" aria-label="그래프 영역입니다."></div>
                  </figure>
                </div>
                <div id="menu2" class="tab_cont is_active">                                
                  <figure class="highcharts-figure">
                    <div id="chart_container2" role="img" aria-label="그래프 영역입니다."></div>
                  </figure>
                </div>
                <div id="menu3" class="tab_cont is_active">                                
                  <figure class="highcharts-figure">
                    <div id="chart_container3" role="img" aria-label="그래프 영역입니다."></div>
                  </figure>
                </div>
              </div>
            `,
            init: function (attachId) {
              payload = msgObj.data;
              updateChart("menu1");
            },
          }
        );
      };
    },

    // CMD_SELECT_DATE : 날짜 선택 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdSelectDate: function (next) {
      Handler.Cmd.apply(this, ["CMD_SELECT_DATE", next]);

      let currFocus = "#startDate";

      this.toAct = function (msgObj) {
        showPopup(
          "조회 기간",
          null,
          {
            html: `
              <!-- datepicker inline -->
              <div class="datepicker_inline">                            
                <div class="date_range_wrap">
                  <input type="text" inputmode="numeric" id="startDate" value="${moment().subtract(6, "months").format("YYYY-MM-DD")}" readonly="true"> 
                  <span>-</span> 
                  <input type="text" inputmode="numeric" id="endDate" value="${moment().subtract(1, "days").format("YYYY-MM-DD")}" readonly="true">
                </div>                    
                <div id="datepicker"></div>
              </div>
              <!-- //datepicker inline -->
            `,
            init: function (attachId) {
              EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
              EventEmitter.subscribe("EVT_OK_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });

              currFocus = "#startDate";
              $("#startDate").addClass("is_active");

              $("#datepicker").datepicker({
                changeMonth: false,
                changeYear: false,
                minDate: new Date('2018-01-01'),
                maxDate: "-1d",
                nextText: "다음 달",
                prevText: "이전 달",
                yearRange: "c-50:c+0",
                showButtonPanel: true,
                closeText: "닫기",
                dateFormat: "yy-mm-dd",
                showAnim: "slide",
                showMonthAfterYear: true,
                yearSuffix: "년",
                dayNamesMin: ["월", "화", "수", "목", "금", "토", "일"],
                monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월",  "10월", "11월", "12월"],
                onUpdateDatepicker: function(inst) {                  
                  $(".ui-datepicker-title").on('click', function() {
                    popupSelectYearMonth({
                      year: inst.selectedYear, 
                      month: inst.selectedMonth
                    }, (year, month) => {

                      let curr = $('.ui-datepicker-title').text().replace(/\s|월/g,'').split('년');
                      curr = moment(`${curr[0]}-${curr[1].toString().padStart(2, '0')}-${1}`, 'YYYY-MM-DD'); 
                      let next = moment(`${year}-${(month+1).toString().padStart(2, '0')}-${1}`, 'YYYY-MM-DD');
                      let loopCount = next.diff(curr, 'months');

                      if (loopCount > 0) {
                        for(let i = 0; i < Math.abs(loopCount); i++) {
                          $('#datepicker .ui-datepicker-next').click()
                        }
                      }
                      else if (loopCount < 0) {
                        for(let i = 0; i < Math.abs(loopCount); i++) {
                          $('#datepicker .ui-datepicker-prev').click()
                        }
                      }
                    });
                  })                  
                },
                onSelect: function (selectedDate) {
                  let toDate = null;

                  if (currFocus == "#startDate") {
                    toDate = moment($("#endDate").val());
                  } else {
                    toDate = moment();
                  }

                  if (toDate.diff(moment(selectedDate), "hours") < 0) {
                    $("#datepicker").datepicker("setDate", toDate.toDate());
                    $(currFocus).val(toDate.format("YYYY-MM-DD"));
                    return;
                  }

                  if (currFocus == "#endDate") {
                    const fromDate = moment($("#startDate").val());
                    if (moment(selectedDate).diff(fromDate, "hours") < 1) {
                      $("#datepicker").datepicker("setDate", fromDate.toDate());
                      $(currFocus).val(fromDate.format("YYYY-MM-DD"));
                      return;
                    }
                  }

                  $(currFocus).val(selectedDate);
                  if (currFocus == "#startDate") {
                    $("#endDate").focus();
                  }
                },
              });
              $("#startDate").focus(() => {
                $("#startDate").addClass("is_active");
                $("#endDate").removeClass("is_active");

                currFocus = "#startDate";
                const toDate = moment($(currFocus).val()).toDate();
                $("#datepicker").datepicker("setDate", toDate);
              });
              $("#endDate").focus(() => {
                $("#startDate").removeClass("is_active");
                $("#endDate").addClass("is_active");

                currFocus = "#endDate";
                const toDate = moment($(currFocus).val()).toDate();
                $("#datepicker").datepicker("setDate", toDate);
              });
              $(".datepicker_inline").css("height", "355px");
              
              $("#datepicker").datepicker("setDate",   moment().subtract(6, "months").toDate());
            },
          },
          true,
          {
            html: `
              <!-- button_bottom -->
              <div class="button_bottom">
                <button type="button">확인</button>
              </div>
              <!-- //button_bottom -->                    
            `,
            init: function (attachId) {

              $(".button_bottom").click(() => {
                const start = $("#startDate").val();
                const end = $("#endDate").val();

                Debug.log("select date: ", start, end);

                Util.sendMessage("", {
                  from: {
                    start: start,
                    end: end,
                  },
                });

                $("#ui-datepicker-div").remove();
                EventEmitter.dispatch("EVT_OK_POPUP" + attachId, attachId);
              });
 
            },
          }
        );
      };
    },

    // CMD_LINK : 링크, 앱링크의 target 화면으로 이동 또는 오픈.
    // ---------------------------------------------------------------------------------------
    CmdLink: function (next) {
    	console.log("next "+ next)
      Handler.Cmd.apply(this, ["CMD_LINK", next]);
      
      
      this.toAct = function (msgObj) {
        let url = (msgObj.data || {}).url;
        const delay = _config.isDebug ? _config.linkDelay : 0;

        if (url) {
          // webview 에서 링크를 요청
          if(_config.isIOS || _config.isAndroid) {
            if (url.match(/^tel/)) {
              Debug.log("call to: ", url);
              setTimeout(() => {
                Debug.log("call: ", url);
                location.href = url;
              }, delay);
            } else if (url.match(/^http/)) {
              Debug.log("open browser: ", url);
              setTimeout(() => {
                Debug.log("excute...");
                safeRun(() => HanaPartner.newBrowser(url));
              }, delay);
            } else {
              if (_config.isIOS && url.match(/.vw|\.jsp/)) {
                const iosPrefixUrl = getApiUrl('iosPrefixUrl');
                Debug.log('-----> wrap api (iosPrefixUrl): ', iosPrefixUrl);

                url = iosPrefixUrl + url;
              }
  
              Debug.log("open app push:", url);
              setTimeout(() => {
                Debug.log("excute...");
                eraseChatbotInstanceMark(() => {
                  safeRun(() => HanaPartner.closePartnerPopup("1", url));
                });
              }, delay);
            }  
          }
          // browser 에서 링크를 요청
          else {

            const prdDomain4Web = getApiUrl('prdDomain4Web');
            const domain4Web = getApiUrl('domain4Web');
            const bridge4Web = getApiUrl('bridge4Web');
            Debug.log('-----> wrap api (prdDomain4Web): ', prdDomain4Web);
            Debug.log('-----> wrap api (domain4Web): ', domain4Web);
            Debug.log('-----> wrap api (bridge4Web): ', bridge4Web);
            
            const reg = new RegExp(`^${prdDomain4Web}`);
            if (reg.test(url)) {
              const query = url.replace(reg, '');
              url = `${domain4Web}${bridge4Web}?goUrl=${query}`;
            }

            Debug.log('browser open: ', url);
            window.open(url, "_blink");
          }
        } else {
          Debug.log("url is empty");
        }
      };
    },

    // CMD_SEARCH_PICKUP_POINT : 환전 수령점 검색 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdSearchPickupPoint: function (next) {
      Handler.Cmd.apply(this, ["CMD_SEARCH_PICKUP_POINT", next]);

      const update = function (attachId, data) {
        Debug.log("data: ", data);

        let html = "";
        if ((data.list || []).length > 0) {
          const list = data.list.map((item, index) => {
            return `
              <li id="branchitem__${index}" role="button">
                <a href="#none">
                  <div class="branch">
                    <p>${item.BUSS_BR_NM}지점</p>
                  </div>
                  <div class="address">
                    ${item.ADR} ${item.EX_ADR || ""}
                  </div>
                </a>
              </li>
            `;
          });
          html = `
            <!-- 검색결과 list -->
            <ul class="search_result_list">
              ${list.join("")}
            </ul>
            <!-- 검색결과 list -->    
          `;
          $(".text_total").show();
          $("#text_total__count").html(list.length.toLocaleString());
        } else {
          html = `
            <div class="no_data">
              찾으시는 결과가 없습니다.<br/>
              영업점 또는 지역명으로 다시 검색해주세요
            </div>
          `;
          $(".text_total").hide();
        }

        $(".modal>.modal_content").html(html);

        $(".modal_content .search_result_list li").click(function (event) {
          const target = $(event.delegateTarget);
          id = target[0].id || "";
          if (id.match(/branchitem__/)) {
            const idx = id.replace(/branchitem__/, "");
            const item = data.list[idx];
            Util.sendMessage(item.BUSS_BR_NM + "지점", { from: item });
            EventEmitter.dispatch("EVT_OK_POPUP" + attachId, attachId);
          }
        });
      };

      let payload = null;

      const load = async function (keyword) {
        let data = null;
        const origin = Util.getOrigin();

        const recvBrUrl = getApiUrl('recvBr');
        const recvBrResultAttr = getApiUrl('recvBrResultAttr');
        Debug.log('-----> wrap api (recvBr): ', recvBrUrl);
        Debug.log('-----> wrap api (recvBrResultAttr): ', recvBrResultAttr);

        const api = origin + recvBrUrl;

        if (!validateSessionTimeout()) {
          Debug.log("chatbot session timeout");
          return;
        }

        showLoading();
        try {
          const response = await fetch(api, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "hai-service-group": "CNA",
              "hai-access-channel": "MBP",
              "hai-request-guid": (payload || {}).reqGuid,
              "hai-device-ipv6adr": (payload || {}).clientIp,
              "hai-device-macadr": (payload || {}).clientMac,
              "hai-access-token": (payload || {}).accessToken,
              "hai-dialog-session-id": (payload || {}).sessionId,
            },
            body: JSON.stringify({
              doAppendMcaHeadBiz: "false",
              trscDvCd: "9",
              curCd: (payload || {}).curCd,
              frcAmt: (payload || {}).frcAmt,
              bussBrNm: keyword || "",
            }),
          });
          data = await response.json();
        } catch (e) {
          Debug.log("ERR load branch: ", e.toString());
          Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
        }

        hideLoading();
        
        Debug.log('pick list: ', ((data || {}).pbkpfxlist || {})[recvBrResultAttr]);

        return {
          list: ((data || {}).pbkpfxlist || {})[recvBrResultAttr],
        };
      };

      const requestList = async function (attachId, keyword) {
        const data = await load(keyword || "");
        update(attachId, await data);
      };

      const search = async function (attachId) {
        const val = $(".search_wrap input").val();
        if ((val || "").length > 0) {
          requestList(attachId, val);
        }
      };

      this.toAct = function (msgObj) {
        showPopup(
          "환전수령점",
          {
            descript: "영업점명 또는 지역을 입력해주세요<br><font color='red'>현재 시점으로</font> 거래 통화를 보유한 영업점만 보여집니다.",
            html: `
              <!-- search_wrap -->
              <div class="search_wrap">
                <input type="text" placeholder="지점명 또는 지역을 입력해주세요" />
                <button type="button">
                  <span class="blind" disabled="disabled">검색</span>
                </button>
              </div>
              <!-- //search_wrap -->
              <!-- //총 건수 -->
              <p class="text_total">총 <span id="text_total__count">0</span>건</p>
              <!-- //총 건수 -->    
            `,
            init: function (attachId, data) {
              payload = data ? { ...data } : null;

              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.subscribe(
                "EVT_CLOSE_POPUP" + attachId,
                (attachId) => {
                  EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                  Util.sendMessage("", {});
                  ModalBSClose(`#${attachId}`, function () {
                    Util.detach(attachId);
                  });
                }
              );
              EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
              EventEmitter.subscribe("EVT_OK_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });

              $(".search_wrap input").on("keyup", function (key) {
                if (key.keyCode == 13) {
                  Debug.log(">> keyup");
                  $(".search_wrap input").blur();
                  search(attachId);
                }
              });

              $(".search_wrap input").on("input", function () {
                const val = $(this).val() || "";
                if (val.length > 0) {
                  $(".search_wrap button").removeAttr("disabled");
                } else {
                  $(".search_wrap button").attr("disabled", "disabled");
                }
              });

              $(".search_wrap button").click(function () {
                search(attachId);
              });
            },
            data: msgObj.data,
          },
          {
            html: `
          `,
            init: function (attachId) { },
          },
          false
        );
      };
    },

    // CMD_SHOW_CALC : 계산기 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdShowCalc: function (next) {
      Handler.Cmd.apply(this, ["CMD_SHOW_CALC", next]);

      const menuForm1 = `
        <!-- 적금 -->
        <div id="menu1" class="tab_cont">
            
          <!-- form_list -->
          <ul class="form_list">
            <li>
              <p>월적립액</p>                            
              <div class="input_clear">
                <input type="text" title="월적립액" placeholder="1억원 이하" inputmode="decimal" pattern="\d*">
                <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
              </div>
            </li>
            <li>
              <p>금리</p>
              <div class="form_wrap1">
                <div class="input_clear">
                  <input type="text" title="이자율 %" placeholder="이자율 %" inputmode="decimal" pattern="\d*">
                  <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
                </div>
                <select title="금리">
                  <option>단리</option>
                  <option>월복리</option>
                </select>
              </div>                            
            </li>
            <li>
              <p>납입기간</p>                            
              <div class="input_clear">
                <input type="text" title="납입기간" placeholder="1개월 이상 ~ 60개월 이하" inputmode="decimal" pattern="\d*">
                <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
              </div>
            </li>
          </ul>
          <!-- //form_list -->

          <!-- button_inner_calculate col1 -->
          <div class="button_inner_calculate">
            <button type="button" class="is_active">일반과세(15.4%)</button><!-- is_active class는 focus와 동일한 style -->
            <button type="button">비과세</button>
          </div>
          <!-- //button_inner_calculate -->

          <!-- list_calculate -->
          <div class="list_calculate">
            <ul>
              <li>
                <div>원금</div>
                <p>0원</p>
              </li>
              <li>
                <div>세전이자</div>
                <p>0원</p>
              </li>
              <li>
                <div>이자과세</div>
                <p>0원</p>
              </li>
            </ul>
            <dl>
              <dt>만기 후 수령액</dt>
              <dd>
                <strong>0</strong>원
              </dd>
            </dl>
          </div>
          <!-- //list_calculate -->

        </div>
        <!-- //적금 -->            
      `;

      const menuInit1 = function (kind) {
        $("#menu1 .input_clear input").on("input", function () {
          EventEmitter.dispatch("EVT_CALC", 1);
        });
        $("#menu1 select").on("input", function () {
          EventEmitter.dispatch("EVT_CALC", 1);
        });
        $("#menu1 .button_inner_calculate button").click(function () {
          $("#menu1 .button_inner_calculate button").removeClass("is_active");
          $(this).addClass("is_active");
          Debug.log($(this).html());
          EventEmitter.dispatch("EVT_CALC", 1);
        });
        $("#menu1 .input_clear input")
          .eq(0)
          .on("keyup", function (key) {
            Util.updateTextView($(this));
          });
        $("#menu1 .input_clear input")
          .eq(0)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/원/g, ""));
          });
        $("#menu1 .input_clear input")
          .eq(0)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "원" : "";
            value = value.replace(/원+$/, "원");
            $(this).val(value);
          });
        $("#menu1 .input_clear input")
          .eq(1)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/\%/g, ""));
          });
        $("#menu1 .input_clear input")
          .eq(1)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "%" : "";
            value = value.replace(/\%+$/, "%");
            $(this).val(value);
          });
        $("#menu1 .input_clear input")
          .eq(2)
          .on("keyup", function (e) {
            var mEvent = e || window.event;
            var mPressed = mEvent.keyCode || mEvent.which;
            if (mPressed == 13) {
              $("#menu1 .input_clear input").blur();
            }
          });
        $("#menu1 .input_clear input")
          .eq(2)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/개월/g, ""));
          });
        $("#menu1 .input_clear input")
          .eq(2)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "개월" : "";
            $(this).val(value);
          });

        if (kind === "적금") {
          $("#menu1").addClass("is_active");
        }
      };

      const calc1 = function () {
        // 월적립액
        let money = $($("#menu1 .input_clear input")[0]).val().replace(/[,원]/g, "");
        // 금리
        let percent = $($("#menu1 .input_clear input")[1]).val().replace(/\%/g, "");
        // 납입기간
        let period = $($("#menu1 .input_clear input")[2]).val();
        // 단리, 월복리
        const method = $("#menu1 select").val();
        // 일반과세, 비과세
        const taxMethod = $("#menu1 .button_inner_calculate button.is_active").html();

        // 금액입력제한
        if (parseInt(money) > 100000000) {
          money = 100000000;
          $($("#menu1 .input_clear input")[0]).val(money);
        } else if (parseInt(money) < 0) {
          money = 0;
          $($("#menu1 .input_clear input")[0]).val(money);
        }

        // 금리제한
        if (parseFloat(percent) > 100) {
          percent = 100;
          $($("#menu1 .input_clear input")[1]).val(percent);
        } else if (parseInt(percent) < 0) {
          percent = "";
          $($("#menu1 .input_clear input")[1]).val(percent);
        }

        // 기간제한
        if (parseInt(period) > 60) {
          period = 60;
          $($("#menu1 .input_clear input")[2]).val(period);
        } else if (parseInt(period) < 1) {
          period = 0;
          $($("#menu1 .input_clear input")[2]).val(period);
        }

        // 원금
        let origin_result = parseInt(money) * parseInt(period);
        // 세전이자
        let interest_result = 0;
        // 이자과세
        let tax_result = 0;
        // 만기후 수령액
        let final_result = 0;

        if (money && percent && period) {
          money = parseInt(money);
          percent = parseFloat(percent);
          period = parseInt(period);

          if (taxMethod.match(/일반과세/)) {
            if (method === "단리") {
              interest_result = money * period * ((period + 1) / 2) * (percent / 100 / 12);
              tax_result = interest_result * 0.154 - ((interest_result * 0.154) % 10);
              final_result = origin_result + interest_result - tax_result;
            } else {
              // 월복리
              final_result = ((money * (1 + percent / 100 / 12) * (Math.pow(1 + percent / 100 / 12, period) - 1)) / (percent / 100 / 12) - money * period) * 0.846 + money * period;
              interest_result = (final_result - origin_result) / 0.846;
              tax_result = interest_result * 0.154 - ((interest_result * 0.154) % 10);
            }
          } else {
            // 비과세
            tax_result = 0;
            if (method === "단리") {
              interest_result = money * period * ((period + 1) / 2) * (percent / 100 / 12);
              final_result = origin_result + interest_result;
            } else {
              // 월복리
              final_result = (money * (1 + percent / 100 / 12) * (Math.pow(1 + percent / 100 / 12, period) - 1)) / (percent / 100 / 12) - money * period + money * period;
              interest_result = final_result - origin_result;
            }
          }
        }

        $($("#menu1 .list_calculate p")[0]).html((Math.round(origin_result) || 0).toLocaleString() + "원");
        $($("#menu1 .list_calculate p")[1]).html((Math.round(interest_result) || 0).toLocaleString() + "원");
        $($("#menu1 .list_calculate p")[2]).html((tax_result > 0 ? "-" : "") + (Math.round(tax_result) || 0).toLocaleString() + "원");
        $("#menu1 .list_calculate strong").html((Math.round(final_result) || 0).toLocaleString());
      };

      const menuForm2 = `
        <!-- 예금 -->
        <div id="menu2" class="tab_cont">
            
          <!-- form_list -->
          <ul class="form_list">
            <li>
              <p>예치금액</p>                            
              <div class="input_clear">
                <input type="text" title="예치금액" placeholder="100억원 이하" inputmode="decimal" pattern="\d*">
                <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
              </div>
            </li>
            <li>
              <p>금리</p>
              <div class="form_wrap1">
                <div class="input_clear">
                  <input type="text" title="이자율 %" placeholder="이자율 %" inputmode="decimal" pattern="\d*">
                  <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
                </div>
                <select title="금리">
                  <option>단리</option>
                  <option>월복리</option>
                  <option>3개월복리</option>
                  <option>6개월복리</option>
                  <option>12개월복리</option>
                </select>
              </div>                            
            </li>
            <li>
              <p>예치기간</p>                            
              <div class="input_clear">
                <input type="text" title="예치기간" placeholder="1개월 이상 ~ 60개월 이하" inputmode="decimal" pattern="\d*">
                <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
              </div>
            </li>
          </ul>
          <!-- //form_list -->

          <!-- button_inner_calculate col1 -->
          <div class="button_inner_calculate">
            <button type="button" class="is_active">일반과세(15.4%)</button><!-- is_active class는 focus와 동일한 style -->
            <button type="button">비과세</button>
          </div>
          <!-- //button_inner_calculate -->

          <!-- list_calculate -->
          <div class="list_calculate">
            <ul>
              <li>
                <div>원금</div>
                <p>0원</p>
              </li>
              <li>
                <div>세전이자</div>
                <p>0원</p>
              </li>
              <li>
                <div>이자과세</div>
                <p>0원</p>
              </li>
            </ul>
            <dl>
              <dt>만기 후 수령액</dt>
              <dd>
                <strong>0</strong>원
              </dd>
            </dl>
          </div>
          <!-- //list_calculate -->

        </div>
        <!-- //예금 -->            
      `;

      const menuInit2 = function (kind) {
        $("#menu2 .input_clear input").on("input", function () {
          EventEmitter.dispatch("EVT_CALC", 2);
        });
        $("#menu2 select").on("input", function () {
          EventEmitter.dispatch("EVT_CALC", 2);
        });
        $("#menu2 .button_inner_calculate button").click(function () {
          $("#menu2 .button_inner_calculate button").removeClass("is_active");
          $(this).addClass("is_active");
          Debug.log($(this).html());
          EventEmitter.dispatch("EVT_CALC", 2);
        });
        $("#menu2 .input_clear input")
          .eq(0)
          .on("keyup", function (key) {
            Util.updateTextView($(this));
          });
        $("#menu2 .input_clear input")
          .eq(0)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/원/g, ""));
          });
        $("#menu2 .input_clear input")
          .eq(0)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "원" : "";
            value = value.replace(/원+$/, "원");
            $(this).val(value);
          });
        $("#menu2 .input_clear input")
          .eq(1)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/\%/g, ""));
          });
        $("#menu2 .input_clear input")
          .eq(1)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "%" : "";
            value = value.replace(/\%+$/, "%");
            $(this).val(value);
          });
        $("#menu2 .input_clear input")
          .eq(2)
          .on("keyup", function (e) {
            var mEvent = e || window.event;
            var mPressed = mEvent.keyCode || mEvent.which;
            if (mPressed == 13) {
              $("#menu2 .input_clear input").blur();
            }
          });
        $("#menu2 .input_clear input")
          .eq(2)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/개월/g, ""));
          });
        $("#menu2 .input_clear input")
          .eq(2)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "개월" : "";
            $(this).val(value);
          });
        if (kind === "예금") {
          $("#menu2").addClass("is_active");
        }
      };

      const calc2 = function () {
        // 예치금액
        let money = $($("#menu2 .input_clear input")[0]).val().replace(/[,원]/g, "");
        // 금리
        let percent = $($("#menu2 .input_clear input")[1]).val().replace(/\%/g, "");
        // 예치기간
        let period = $($("#menu2 .input_clear input")[2]).val();
        // 단리, 월복리, 3개월복리, 6개월복리, 12개월복리
        const method = $("#menu2 select").val();
        // 일반과세, 비과세
        const taxMethod = $("#menu2 .button_inner_calculate button.is_active").html();

        // 금액입력제한
        if (parseInt(money) > 10000000000) {
          money = 10000000000;
          $($("#menu2 .input_clear input")[0]).val(money);
        } else if (parseInt(money) < 0) {
          money = 0;
          $($("#menu2 .input_clear input")[0]).val(money);
        }

        // 금리제한
        if (parseFloat(percent) > 100) {
          percent = 100;
          $($("#menu2 .input_clear input")[1]).val(percent);
        } else if (parseInt(percent) < 0) {
          percent = "";
          $($("#menu2 .input_clear input")[1]).val(percent);
        }

        // 기간제한
        if (parseInt(period) > 60) {
          period = 60;
          $($("#menu2 .input_clear input")[2]).val(period);
        } else if (parseInt(period) < 1) {
          period = 0;
          $($("#menu2 .input_clear input")[2]).val(period);
        }

        // 원금
        let origin_result = parseInt(money);
        // 세전이자
        let interest_result = 0;
        // 이자과세
        let tax_result = 0;
        // 만기후 수령액
        let final_result = 0;

        if (money && percent && period) {
          money = parseInt(money);
          percent = parseFloat(percent);
          period = parseInt(period);

          if (taxMethod.match(/일반과세/)) {
            switch (method) {
              case "단리":
                interest_result = money * period * (percent / 100 / 12);
                tax_result = interest_result * 0.154 - ((interest_result * 0.154) % 10);
                final_result = origin_result + interest_result - tax_result;
                break;
              case "월복리":
                interest_result = money * Math.pow(1 + percent / 100 / 12, period) - origin_result;
                tax_result = interest_result * 0.154 - ((interest_result * 0.154) % 10);
                final_result = origin_result + interest_result - tax_result;
                break;
              case "3개월복리":
                interest_result = money * Math.pow(1 + percent / 100 / 4, period / 3) - origin_result;
                tax_result = interest_result * 0.154 - ((interest_result * 0.154) % 10);
                final_result = origin_result + interest_result - tax_result;
                break;
              case "6개월복리":
                interest_result = money * Math.pow(1 + percent / 100 / 2, period / 6) - origin_result;
                tax_result = interest_result * 0.154 - ((interest_result * 0.154) % 10);
                final_result = origin_result + interest_result - tax_result;
                break;
              case "12개월복리":
                interest_result = money * Math.pow(1 + percent / 100, period / 12) - origin_result;
                tax_result = interest_result * 0.154 - ((interest_result * 0.154) % 10);
                final_result = origin_result + interest_result - tax_result;
                break;
            }
          } else {
            // 비과세
            tax_result = 0;
            switch (method) {
              case "단리":
                interest_result = money * period * (percent / 100 / 12);
                final_result = origin_result + interest_result;
                break;
              case "월복리":
                interest_result =
                  money * Math.pow(1 + percent / 100 / 12, period) - origin_result;
                final_result = origin_result + interest_result;
                break;
              case "3개월복리":
                interest_result =
                  money * Math.pow(1 + percent / 100 / 4, period / 3) - origin_result;
                final_result = origin_result + interest_result;
                break;
              case "6개월복리":
                interest_result =
                  money * Math.pow(1 + percent / 100 / 2, period / 6) - origin_result;
                final_result = origin_result + interest_result;
                break;
              case "12개월복리":
                interest_result =
                  money * Math.pow(1 + percent / 100, period / 12) - origin_result;
                final_result = origin_result + interest_result;
                break;
            }
          }
        }

        $($("#menu2 .list_calculate p")[0]).html((Math.round(origin_result) || 0).toLocaleString() + "원");
        $($("#menu2 .list_calculate p")[1]).html((Math.round(interest_result) || 0).toLocaleString() + "원");
        $($("#menu2 .list_calculate p")[2]).html((tax_result > 0 ? "-" : "") + (Math.round(tax_result) || 0).toLocaleString() + "원");
        $("#menu2 .list_calculate strong").html((Math.round(final_result) || 0).toLocaleString());
      };

      const menuForm3 = `
        <!-- 대출 -->
        <div id="menu3" class="tab_cont">
        
          <!-- form_list -->
          <ul class="form_list">
            <li>
              <p>대출금액</p>                            
              <div class="input_clear">
                <input type="text" title="대출금액" placeholder="100억원 이하" inputmode="decimal" pattern="\d*">
                <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
              </div>
            </li>
            <li>
              <p>금리</p>
              <div class="input_clear">
                <input type="text" title="연 이자율 %" placeholder="연 이자율 %" inputmode="decimal" pattern="\d*">
                <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
              </div>                     
            </li>
            <li>
              <p>대출기간</p>                            
              <div class="input_clear">
                <input type="text" title="예치기간" placeholder="1개월 이상 ~ 600개월 이하" inputmode="decimal" pattern="\d*">
                <button type="button" class="clear_btn"><span class="blind">삭제</span></button>
              </div>
            </li>
          </ul>
          <!-- //form_list -->

          <!-- button_inner_calculate col2 -->
          <div class="button_inner_calculate">
            <button type="button" class="is_active">원리금균등</button><!-- is_active class는 focus와 동일한 style -->
            <button type="button">원금균등</button>
            <button type="button">만기일시</button>
          </div>
          <!-- //button_inner_calculate -->

          <!-- list_calculate -->
          <div class="list_calculate">
            <ul>
              <li>
                <div>대출금액</div>
                <p>0원</p>
              </li>
              <li>
                <div>대출이자합계</div>
                <p>0원</p>
              </li>
              <li>
                <div>평월납부금액</div>
                <p>0원</p>
              </li>
            </ul>
            <dl>
              <dt>
                만기월납부금액
                <p>※ 월별 원금감소에 따라 이자 상이</p>
              </dt>
              <dd>
                <strong>0</strong>원
              </dd>
            </dl>
          </div>
          <!-- //list_calculate -->

        </div>
        <!-- //대출 -->            
      `;

      const menuInit3 = function (kind) {
        $("#menu3 .input_clear input").on("input", function () {
          EventEmitter.dispatch("EVT_CALC", 3);
        });
        $("#menu3 select").on("input", function () {
          EventEmitter.dispatch("EVT_CALC", 3);
        });
        $("#menu3 .button_inner_calculate button").click(function () {
          $("#menu3 .button_inner_calculate button").removeClass("is_active");
          $(this).addClass("is_active");
          Debug.log($(this).html());
          EventEmitter.dispatch("EVT_CALC", 3);
        });

        $("#menu3 .input_clear input").eq(0)
          .on("keyup", function (key) {
            Util.updateTextView($(this));
          });
        $("#menu3 .input_clear input").eq(0)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/원/g, ""));
          });
        $("#menu3 .input_clear input").eq(0)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "원" : "";
            value = value.replace(/원+$/, "원");
            $(this).val(value);
          });
        $("#menu3 .input_clear input").eq(1)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/\%/g, ""));
          });
        $("#menu3 .input_clear input").eq(1)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "%" : "";
            value = value.replace(/\%+$/, "%");
            $(this).val(value);
          });

        $("#menu3 .input_clear input").eq(2)
          .on("keyup", function (e) {
            var mEvent = e || window.event;
            var mPressed = mEvent.keyCode || mEvent.which;
            if (mPressed == 13) {
              $("#menu3 .input_clear input").blur();
            }
          });
        $("#menu3 .input_clear input").eq(2)
          .on("focus", function (key) {
            $(this).val($(this).val().replace(/개월/g, ""));
          });
        $("#menu3 .input_clear input").eq(2)
          .on("blur", function (key) {
            let value = $(this).val();
            value = value ? value + "개월" : "";
            $(this).val(value);
          });

        if (kind === "대출") {
          $("#menu3").addClass("is_active");
        }
      };

      const calc3 = function () {
        // 대출금액
        let money = $($("#menu3 .input_clear input")[0]).val().replace(/[,원]/g, "");
        // 금리
        let percent = $($("#menu3 .input_clear input")[1]).val().replace(/\%/, "");
        // 대출기간
        let period = $($("#menu3 .input_clear input")[2]).val();
        // 원리금균등, 원금균등, 만기일시
        const taxMethod = $("#menu3 .button_inner_calculate button.is_active").html();

        // 금액입력제한
        if (parseInt(money) > 10000000000) {
          money = 10000000000;
          $($("#menu3 .input_clear input")[0]).val(money);
        } else if (parseInt(money) < 0) {
          money = 0;
          $($("#menu3 .input_clear input")[0]).val(money);
        }

        // 금리제한
        if (parseFloat(percent) > 100) {
          percent = 100;
          $($("#menu3 .input_clear input")[1]).val(percent);
        } else if (parseInt(percent) < 0) {
          percent = "";
          $($("#menu3 .input_clear input")[1]).val(percent);
        }

        // 기간제한
        if (parseInt(period) > 600) {
          period = 600;
          $($("#menu3 .input_clear input")[2]).val(period);
        } else if (parseInt(period) < 1) {
          period = 1;
          $($("#menu3 .input_clear input")[2]).val(period);
        }

        // 대출금액
        let origin_result = parseInt(money);
        // 대출이자합계
        let interest_result = 0;
        // 평월납부금액
        let month_result = 0;
        // 만기월납부금액
        let final_result = 0;

        if (money && percent && period) {
          money = parseInt(money);
          percent = parseFloat(percent);
          period = parseInt(period);

          if (taxMethod.match(/원리금균등/)) {
            month_result = origin_result * (percent / 12 / 100 / (1 - 1 / Math.pow(1 + percent / 12 / 100, period)));
            final_result = month_result;
            interest_result = final_result * period - origin_result;
          } 
          else if (taxMethod.match(/원금균등/)) {
            for (let j = 1; j <= period; j++) {
              interest_result = interest_result + (origin_result - (origin_result * (j - 1)) / period) * (percent / 12 / 100);
            }
            month_result = origin_result / period + origin_result * (percent / 12 / 100);
            final_result = origin_result / period + (origin_result / period) * (percent / 12 / 100);
          } else {
            // 만기일시
            interest_result = origin_result * (percent / 12 / 100) * period;
            month_result = origin_result * (percent / 12 / 100);
            final_result = origin_result + origin_result * (percent / 12 / 100);
          }
        }

        $($("#menu3 .list_calculate p")[0]).html((Math.round(origin_result) || 0).toLocaleString() + "원");
        $($("#menu3 .list_calculate p")[1]).html((Math.round(interest_result) || 0).toLocaleString() + "원");
        $($("#menu3 .list_calculate p")[2]).html((Math.round(month_result) || 0).toLocaleString() + "원");
        $("#menu3 .list_calculate strong").html((Math.round(final_result) || 0).toLocaleString());
      };

      this.toAct = function (msgObj) {
        const kind = (msgObj.data || {}).kind || "적금";

        Debug.log("kind: ", kind);

        showPopup(
          "하이 계산기",
          {
            html: `
              <!-- tab button -->
              <ul class="tab type1">
                <li ${kind === "적금" ? 'class="is_active"' : ""} data-tab="menu1">
                  <a href="#" ${kind === "적금" ? 'title="선택됨"' : ""}>적금</a>
                </li>
                <li ${kind === "예금" ? 'class="is_active"' : ""} data-tab="menu2">
                  <a href="#" ${kind === "예금" ? 'title="선택됨"' : ""}>예금</a>
                </li>
                <li ${kind === "대출" ? 'class="is_active"' : ""} data-tab="menu3">
                  <a href="#" ${kind === "대출" ? 'title="선택됨"' : ""}>대출</a>
                </li>
              </ul>
              <!-- //tab button -->    
            `,
            init: function (attachId) {
              registTabHandler(attachId);

              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
                  EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                  EventEmitter.unsubscribe("EVT_CALC");
                  ModalBSClose(`#${attachId}`, function () {
                    Util.sendMessage("", { from: 'ABOUT_CHATBOT' });
                    Util.detach(attachId);
                  });
                }
              );
            },
          },
          {
            html: `
              ${menuForm1}
              ${menuForm2}
              ${menuForm3}
            `,
            init: function (attachId) {
              EventEmitter.subscribe("EVT_CALC", (tab) => {
                switch (tab) {
                  case 1:
                    calc1();
                    break;
                  case 2:
                    calc2();
                    break;
                  case 3:
                    calc3();
                    break;
                }
              });

              menuInit1(kind);
              menuInit2(kind);
              menuInit3(kind);
            },
          }
        );
      };
    },
    

    // CMD_REQUEST_LOGIN : 로그인 요청
    // ---------------------------------------------------------------------------------------
    CmdRequestLogin: function (next) {
      Handler.Cmd.apply(this, ["CMD_REQUEST_LOGIN", next]);

      function forceLogout() {
        return new Promise((resolve, reject) => {
          safeRun(() =>
            HanaBridge.logout(
              false,
              (data) => resolve(data),
              (err) => reject(err)
            ),
            (e) => reject(e)
          );
        });
      }

      async function preworkForLogin() {
        try {
          await forceLogout();
        } catch (e) {
          Debug.log("forceLogout failed: ", e.toString ? e.toString() : e);
        }
      }

      this.toAct = function (msgObj) {
        const customerQuestion = (msgObj.data || {}).customerQuestion; // 직전
																		// 질문.
																		// 로그인챗봇
																		// 진입 후
																		// 자동발화용
																		// (optional)
        const accessToken = (msgObj.data || {}).accessToken; // 현 로그인 상태 판단을
																// 위한 값. 값이 있을경우
																// 로그인 된 사용자이기
																// 때문에 로그아웃을 선처리
																// 한다.
																// (optional)

        (async function () {
          if (accessToken) {
            await preworkForLogin();
          }

          Debug.log("try setGlobalVariable()", customerQuestion);

          try {
            HanaPartner.setGlobalVariable(
              "prevQuestion",
              customerQuestion,
              (data) => {
                Debug.log("result: ", data);
              },
              (e) => {
                Debug.log("HanaPartner.getGlobalVariable error: ", e);
              }
            );
          } catch (e) {
            Debug.log("> HanaPartner.getGlobalVariable error: ", e, e.toString());
            Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
          }

          // 로그인 page url
          const url = `/mbp/resource/html/CCOM/CCOM00/CCOM0035001.html?link=callAiccChatbot&isLogin=Y`;
          const delay = _config.isDebug ? _config.linkDelay : 0;
          Debug.log("open app push:", url);
          setTimeout(() => {
            Debug.log("excute...");
            eraseChatbotInstanceMark(() => {
              safeRun(() => HanaPartner.closePartnerPopup("1", url));
            });
          }, delay);
        })();
      };
    },

    // CMD_ACCOUNT_HISTORY : 거래내역 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdAccountHistory: function (next) {
      Handler.Cmd.apply(this, ["CMD_ACCOUNT_HISTORY", next]);

      this.toAct = function (msgObj) {
        Debug.log("receivce : ", msgObj);

        const account = (msgObj.data || {}).account || {};
        const strDt = (msgObj.data || {}).strDt;
        const endDt = (msgObj.data || {}).endDt;

        // 평가금액 항목 제외
        const all = ((msgObj.data || {}).history || []).filter(
          (item) => item.FUND_TRSC_KIND_CD != "813"
        );

        let deposits = [];
        let withdraws = [];

        const isDepositFund = (_cd) => 
          Boolean(["101","201","302","432","441","462","891","892","241"].find((cd) => cd == _cd));
        const isWithdrawFund = (_cd) => 
          Boolean(["102", "202", "301", "431", "461", "471", "893"].find((cd) => cd == _cd));

        // 펀드
        if (account.ACCT_TYP_CD == "07") {
          deposits = all.filter((item) =>
            isDepositFund(item.FUND_TRSC_KIND_CD)
          );
          withdraws = all.filter((item) =>
            isWithdrawFund(item.FUND_TRSC_KIND_CD)
          );
          // 대출
        } else if (account.ACCT_TYP_CD == "08" || account.ACCT_TYP_CD == "13") {
          deposits = all.filter((item) => item.LN_DPS_TRSC_KIND_CD == "231");
          withdraws = all.filter((item) => item.LN_DPS_TRSC_KIND_CD != "231");
          // 그외
        } else {
          deposits = all.filter((item) => item.TRSC_KIND_NM !== "지급");
          withdraws = all.filter((item) => item.TRSC_KIND_NM === "지급");
        }

        Debug.log("입금: ", deposits);
        Debug.log("출금: ", withdraws);
        Debug.log("계좌: ", account);

        if (all.length === 0) {
          Util.sendMessage("정보가 없습니다.");
          return;
        }

        function makeFundRow(item) {
          return `
            <a>
              <div class="account_info">
                <strong>${item.TRSC_KIND_CD_NM}</strong>
                <p>
                  ${
                    item.TRSC_DT && item.TRSC_PROC_TM
                    ? item.TRSC_DT
                      ? moment(item.TRSC_DT + " " + item.TRSC_PROC_TM).format("MM.DD HH:mm:ss")
                      : ""
                    : ""
                  }
                </p>
              </div>
              <div class="amount">
              ${
                item.RCV_AMT_CTT || item.PAYM_AMT_CTT
                ? `
                    <strong ${!isWithdrawFund(item.FUND_TRSC_KIND_CD) ? 'class="text_style1"' : ""}>
                      ${(() => {
                        if (item.FUND_TRSC_KIND_CD == "241") {
                          return (item.RCV_STCK_CNT_CTT || item.PAYM_STCK_CNT_CTT);
                      }
                      return item.RCV_AMT_CTT || item.PAYM_AMT_CTT;
                    })()}
                    </strong>
                    <span ${!isWithdrawFund(item.FUND_TRSC_KIND_CD) ? 'class="text_style1"' : ""}>
                      ${
                        (() => {
                          const checkedKind = (item.ACCT_NO || "").match(/13$/) ||
                            [
                              "환매취소",
                              "환매체결",
                              "매입체결",
                              "결산재투자",
                              "해지신청",
                              "환매신청",
                            ].find((name) => name == item.TRSC_KIND_CD_NM);
                          return checkedKind ? "좌" : "원";
                        })()
                      }
                      </span>
                  `
                : ""
              }
              </div>   
            </a>                    
          `;
        }

        function makeLoanRow(item) {
          return `
            <a>
              <div class="account_info min_height1">
                <strong>${item.TRSC_KIND_NM}</strong>
                <p>${moment(item.TRSC_DT + " " + item.TRSC_TM).format("MM.DD HH:mm:ss")}</p>
              </div>

              <div class="amount">
                <strong ${item.LN_DPS_TRSC_KIND_CD == "231" ? 'class="text_style1"' : ""}>                            
                  ${item.CUR_CD == "KRW" ? "" : item.CUR_CD + " "}
                  ${item.CUR_CD == "KRW"
                    ? parseInt(item.TRSC_AMT).toLocaleString()
                    : parseFloat(item.TRSC_AMT).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
                  }
                </strong>
                <span>${item.CUR_CD == "KRW" ? "원" : ""}</span>
                <p>잔액 
                  ${item.CUR_CD == "KRW" ? "" : item.CUR_CD + " "} 
                  ${item.CUR_CD == "KRW"
                    ? parseInt(item.TRSC_AF_BAL).toLocaleString()
                    : parseFloat(item.TRSC_AF_BAL).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
                  }
                  ${item.CUR_CD == "KRW" ? "원" : ""}
                </p>
              </div>   
            </a>                    
          `;
        }

        function makeDefaultRow(item) {
          return `
            <a>
              <div class="account_info min_height1">
                <strong>${item.RMRK || item.SUMM_PSBK_RMRK}</strong>
                  <p>${moment(item.TRSC_DT + " " + item.TRSC_TM).format("MM.DD HH:mm:ss")}</p>
              </div>

              <div class="amount${item.TRSC_KIND_NM !== "지급" ? "" : " minus"}">
                <strong ${item.TRSC_KIND_NM !== "지급" ? 'class="text_style1"' : ""}>
                  ${item.TRSC_KIND_NM !== "지급" ? "+ " : "- "}
                  ${item.CUR_CD == "KRW" ? "" : item.CUR_CD + " "}
                  ${item.CUR_CD == "KRW"
                    ? parseInt(item.TRSC_AMT).toLocaleString()
                    : parseFloat(item.TRSC_AMT).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
                  }
                </strong>
                <span ${item.TRSC_KIND_NM !== "지급" ? 'class="text_style1"' : ""}>
                  ${item.CUR_CD == "KRW" ? "원" : ""}
                </span>
                <p>
                  잔액 
                  ${item.CUR_CD == "KRW" ? "" : item.CUR_CD + " "}
                  ${item.CUR_CD == "KRW"
                    ? parseInt(item.TRSC_AF_BAL).toLocaleString()
                    : parseFloat(item.TRSC_AF_BAL).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})
                  }
                  ${item.CUR_CD == "KRW" ? "원" : ""}
                </p>
              </div>   
            </a>                    
          `;
        }

        function makeRow(ACCT_TYP_CD, item) {
          switch (ACCT_TYP_CD) {
            case "07":
              return makeFundRow(item);
            case "08":
            case "13":
              return makeLoanRow(item);
          }
          return makeDefaultRow(item);
        }

        function makeList(name, list) {
          return (list || []).length > 0
            ? list.reduce((accu, item, idx) =>
                accu + `<li id="${name}_${idx}" role="button">${makeRow(account.ACCT_TYP_CD, item)}</li>`, "")
            : `
              <div class="no_data no_border">
                  내역이 없습니다.
              </div>
            `;
        }

        showPopup(
          "거래내역조회",
          {
            html: `
              ${strDt && endDt
                ? `
                    <p class="modal_desp text_style1">
                      조회기간 ${moment(strDt).format("YYYY.MM.DD")} ~ ${moment(endDt).format("YYYY.MM.DD")}
                    </p>
                  `
                : ""
              }
              <p class="modal_desp">챗봇에서는 최대 100건까지 조회가 가능합니다.</p>        
              <ul class="tab type1">
                <li class="is_active" data-tab="menu1"><a href="#" title="선택됨">전체</a></li>
                <li data-tab="menu2"><a href="#">입금</a></li>
                <li data-tab="menu3"><a href="#">출금</a></li>
              </ul>
            `,
            init: function (attachId) {
              registTabHandler(attachId);
            },
          },
          {
            html: `                    
              <div id="menu1" class="tab_cont is_active">
                <ul class="list type4">
                  ${makeList("all", all)}
                </ul>
                ${all.length > 99
                  ? `
                      <div class="button_inner">
                        <button type="button">하나원큐 거래내역조회</button>
                      </div>                                    
                    `
                  : ""
                }
              </div>
      
              <div id="menu2" class="tab_cont">
                <ul class="list type4">
                  ${makeList("deposits", deposits)}
                </ul>
              </div>
      
              <div id="menu3" class="tab_cont">
                <ul class="list type4">
                  ${makeList("withdraws", withdraws)}
                </ul>
              </div>
            `,
            init: function (attachId) {

              $(".modal_content .button_inner").click(function () {
                Util.sendMessage("하나원큐 거래내역조회", { from: true });
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });

              $("li")
                .filter(function () {
                  return this.id.match(/^((all)|(deposits)|(withdraws))_item_/);
                })
                .click(function (event) {
                  const target = $(event.delegateTarget);
                  const id = target[0].id || "";

                  const tmps = id.split("_");
                  const kind = tmps[0];
                  const idx = tmps[2];
                  const item = {
                    all: all,
                    deposits: deposits,
                    withdraws: withdraws,
                  }[kind][idx];

                  Util.sendMessage("", { from: item });
                  EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
                });
            },
          },
          false
        );
      };
    },

    // CMD_INPUT_EMAIL : 이메일 입력폼 팝업호출 
    // ---------------------------------------------------------------------------------------
    CmdInputEmail: function (next) {
      Handler.Cmd.apply(this, ["CMD_INPUT_EMAIL", next]);

      function isValid(email) {
        return Boolean((email || "").match(/^.+\@.+\..+$/));
      }

      this.toAct = function (msgObj) {
        const currEmail = (msgObj.data || {}).email || "";

        showPopup(
          "이메일 변경하기",
          null,
          {
            html: `
              <ul class="form_list">
                <li>
                  <p>변경전</p>
                  <input type="text" title="변경전" value="${currEmail}" readonly>
                </li>
                <li>
                  <p>변경후</p>
                  <input type="text" title="변경후" placeholder="example@email.com">
                </li>
              </ul>
            `,
          },
          true,
          {
            html: `
              <div class="button_bottom">
                <button type="button" disabled="disabled">확인</button>
              </div>
            `,
            init: function (attachId) {
              const input = $(".form_list input").eq(1);
              input.on("input", function () {
                if (isValid($(this).val())) {
                  $(".button_bottom button").attr("disabled", false);
                } else {
                  $(".button_bottom button").attr("disabled", true);
                }
              });
              input.on("blur", function () {
                if (isValid($(this).val())) {
                  $(this).removeClass("error");
                  $(this).addClass("is_active");
                } else {
                  $(this).removeClass("is_active");
                  $(this).addClass("error");
                }
              });
              $(".button_bottom button").click(function () {
                if (!$(this).attr("disabled")) {
                  const email = $(".form_list input").eq(1).val();
                  Util.sendMessage(email || "", { from: email });
                  EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
                }
              });
            },
          }
        );
      };
    },

    // CMD_INPUT_PHONE : 전화번호 입력폼 팝업호출   
    // ---------------------------------------------------------------------------------------
    CmdInputPhone: function (next) {
      Handler.Cmd.apply(this, ["CMD_INPUT_PHONE", next]);

      function isValid(value) {
        return Boolean(
          (value || "").match(
            /^(02|051|053|032|062|042|052|044|031|033|043|063|061|054|055|064|070|080)[-| ]?[0-9]{3,4}[-| ]?[0-9]{4}$/
          )
        );
      }

      this.toAct = function (msgObj) {
        const currPhone = (msgObj.data || {}).phone || "";

        showPopup(
          "전화번호 조회/변경",
          null,
          {
            html: `
              <ul class="form_list">
                <li>
                  <p>변경전</p>
                  <input type="text" title="변경전" value="${currPhone}" readonly>
                </li>
                <li>
                  <p>변경후</p>
                  <input type="text" inputmode="numeric" title="변경후">
                </li>
              </ul>
            `,
          },
          true,
          {
            html: `
              <div class="button_bottom">
                <button type="button" disabled="disabled">확인</button>
              </div>
            `,
            init: function (attachId) {
              const input = $(".form_list input").eq(1);
              input.on("input", function () {
                if (isValid($(this).val())) {
                  $(".button_bottom button").attr("disabled", false);
                } else {
                  $(".button_bottom button").attr("disabled", true);
                }
              });
              input.on("blur", function () {
                if (isValid($(this).val())) {
                  $(this).removeClass("error");
                  $(this).addClass("is_active");
                } else {
                  $(this).removeClass("is_active");
                  $(this).addClass("error");
                }
              });
              $(".button_bottom button").click(function () {
                if (!$(this).attr("disabled")) {
                  const phone = $(".form_list input").eq(1).val();
                  Util.sendMessage(phone || "", { from: phone });
                  EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
                }
              });
            },
          }
        );
      };
    },

    // CMD_INPUT_MOBILE : 휴대폰 입력폼 팝업호출
    // ---------------------------------------------------------------------------------------
    CmdInputMobile: function (next) {
      Handler.Cmd.apply(this, ["CMD_INPUT_MOBILE", next]);

      function isValid(value) {
        return Boolean(
          (value || "").match(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/)
        );
      }

      this.toAct = function (msgObj) {
        const currMobile = (msgObj.data || {}).mobile || "";

        showPopup(
          "핸드폰 전화번호 변경하기",
          null,
          {
            html: `
              <ul class="form_list">
                <li>
                  <p>변경전</p>
                  <input type="text" title="변경전" value="${currMobile}" readonly>
                </li>
                <li>
                  <p>변경후</p>
                  <select title="통신사">
                    <option>SKT</option>
                    <option>KT</option>
                    <option>LGU+</option>
                    <option>SKT(알뜰)</option>
                    <option>KT(알뜰)</option>
                    <option>LGU+(알뜰)</option>
                  </select>
                  <input type="text" inputmode="numeric" title="변경후">
                </li>
              </ul>
            `,
          },
          true,
          {
            html: `
              <div class="button_bottom">
                <button type="button" disabled="disabled">확인</button>
              </div>
            `,
            init: function (attachId) {
              const input = $(".form_list input").eq(1);
              input.on("input", function () {
                if (isValid($(this).val())) {
                  $(".button_bottom button").attr("disabled", false);
                } else {
                  $(".button_bottom button").attr("disabled", true);
                }
              });
              input.on("blur", function () {
                if (isValid($(this).val())) {
                  $(this).removeClass("error");
                  $(this).addClass("is_active");
                } else {
                  $(this).removeClass("is_active");
                  $(this).addClass("error");
                }
              });
              $(".button_bottom button").click(function () {
                if (!$(this).attr("disabled")) {
                  const telecom = $(".form_list select").val();
                  const mobile = $(".form_list input").eq(1).val();
                  Util.sendMessage(mobile || "", {
                    from: { mobile: mobile, telecom: telecom },
                  });
                  EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
                }
              });
            },
          }
        );
      };
    },

    // CMD_SELECT_POST_RECEIVE : 우편물 수령처 선택 팝업호출  
    // ---------------------------------------------------------------------------------------
    CmdSelectPostReceive: function (next) {
      Handler.Cmd.apply(this, ["CMD_SELECT_POST_RECEIVE", next]);

      this.toAct = function (msgObj) {
        const currPostAccept = (msgObj.data || {}).postAccept || "";

        showPopup("우편물 수령처", null, {
          html: `
            <!-- form list -->
            <ul class="form_list">
              <li>
                <p>변경전</p>
                <input type="text" title="변경전" value="${currPostAccept}"  readonly>
              </li>
            </ul>
            <!-- // form list -->

            <p class="text_style3">변경후</p>
            <!-- list -->
            <ul class="list type1">
              <li>
                <a>
                  자택
                </a>
              </li>
              <li>
                <a>
                  직장
                </a>
              </li>
              <li>
                <a>
                  우편미수신
                </a>
              </li>
            </ul>
            <!-- // list -->
          `,
          init: function (attachId) {
            EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
            EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
              Util.sendMessage("", {});
              ModalBSClose(`#${attachId}`, function () {
                Util.detach(attachId);
              });
            });
            EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
            EventEmitter.subscribe("EVT_OK_POPUP" + attachId, (attachId) => {
              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
              ModalBSClose(`#${attachId}`, function () {
                Util.detach(attachId);
              });
            });

            $(".modal_content .list li").click(function (event) {
              Debug.log($(this).text());
              const data = $(this)
                .text()
                .replace(/^\s+|\n|\s+$/g, "");
              Util.sendMessage(data, { from: data });
              EventEmitter.dispatch("EVT_OK_POPUP" + attachId, attachId);
            });
          },
        });
      };
    },

    // CMD_HAMBURGER : 햅버거메뉴 및 서브메뉴 호출
    // ---------------------------------------------------------------------------------------
    CmdHambuger: function (next) {
      Handler.Cmd.apply(this, ["CMD_HAMBURGER", next]);

      this.toAct = function (msgObj) {
        $(".menu_bg").show();
        $("body").addClass("scroll_hidden");
        $(".sidebar_menu").show().animate({
          left: 0,
        });
        
        setTimeout(() => {
          const menu = (msgObj.data || {}).menu;
          Debug.log('팝업창 on')
          switch (menu) {
            case "하이챗봇 알아보기":
              showPopupPreview();
              break;
            case "FAQ":
              showPopupFaq();
              break;
            case "이전대화보기(최근 1주일)":
              showPopupHistory();
              break;
            case "하이챗봇 카카오톡 친구추가":
              openKakaoPage();
              break;
            default:
              break;
             
          }
          
        }, 0);
        
      };
     
    },

    // CMD_SELECT_LIST : 공용 커스텀 목록선택 팝업호출   
    // ---------------------------------------------------------------------------------------
    CmdSelectList: function (next) {
      Handler.Cmd.apply(this, ["CMD_SELECT_LIST", next]);

      this.toAct = function (msgObj) {
        const title = (msgObj.data || {}).title || "";
        const descript = (msgObj.data || {}).descript || "";
        const list = (msgObj.data || {}).list || [];
        const listType = (msgObj.data || {}).listType || "type1";
        const rowForm = (msgObj.data || {}).rowForm;
        const cancelMsg = (msgObj.data || {}).cancelMsg;
        const additionalMsg = (msgObj.data || {}).additionalMsg;

        showPopup(
          title,
          {
            descript: descript,
            html: `
              <p class="text_total"></p>
            `,
          },
          {
            html: `
              <ul class="list ${listType}">
              ${
                list.reduce((accu, item, idx) => {
                  let row = "";

                  const keyToValue = (rowForm, listItem) => {
                    let buf = rowForm;
                    const rowItemKeys = (rowForm || "").match(/@\{.+?\}/g) || [];
                    rowItemKeys.forEach((item) => {
                      const key = item.replace(/@\{(.+?)\}/, "$1");
                      const value = listItem[key] || "";
                      buf = buf.replace(item, value);
                    });

                    return buf;
                  };

                  if (rowForm) {
                    row = `
                      <li id=${"select_item__" + idx} role="button">
                        ${listType == "type1" ? `<a>${keyToValue(rowForm, item)}</a>` : keyToValue(rowForm, item)}
                      </li>
                    `;
                  } else {
                    row = `
                      <li id=${"select_item__" + idx} role="button">
                        ${listType == "type1" ? `<a>${item}</a>` : item}
                      </li>
                    `;
                  }

                  return accu + row;
                }, "")
              }
              </ul>
            `,
            init: function (attachId) {
              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.subscribe(
                "EVT_CLOSE_POPUP" + attachId,
                (attachId) => {
                  EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                  EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                  Util.sendMessage(cancelMsg || "", {});
                  ModalBSClose(`#${attachId}`, function () {
                    Util.detach(attachId);
                  });
                }
              );
              EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
              EventEmitter.subscribe("EVT_OK_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              });

              $(".modal_content .list li").click(function (event) {
                let data = null;
                if (rowForm) {
                  const idx = this.id.replace(/select_item__/, "");
                  data = list[idx];
                } else {
                  data = $(this)
                    .text()
                    .replace(/^\s+|\n|\s+$/g, "");
                }
                let msg = Util.toAccountString((data || {}).ACCT_NO || "");
                if (additionalMsg) {
                  msg += " " + additionalMsg;
                }

                Util.sendMessage(msg, { from: data });
                EventEmitter.dispatch("EVT_OK_POPUP" + attachId, attachId);
              });
            },
          }
        );
      };
    },

    // CMD_SEND_USERKEY
    // ---------------------------------------------------------------------------------------
    CmdSendUserKey: function (next) {
      Handler.Cmd.apply(this, ["CMD_SEND_USERKEY", next]);

      this.toAct = function (msgObj) {
        _config.userKey = (msgObj.data || {}).userKey;
        _config.custNm = (msgObj.data || {}).custNm;
        _config.FST_CONN_DTM = (msgObj.data || {}).FST_CONN_DTM;
        _config.user = (msgObj.data || {}).user || {};
        _config.deploy = (msgObj.data || {}).deploy || "prd";
        _config.urlsToUsingInWrap = (msgObj.data || {}).urlsToUsingInWrap;

        // LIVEAGENT
        _config.useLiveagent = (msgObj.data || {}).useLiveagent;        

        if (_config.deploy.toLowerCase() == "prd") {
          _config.isDebug = false;
          _config.isDev = false;
          Debug.isOk = _config.isDebug;
          
          // 운영일 경우 상단 헤드폰 클래스 삭제
          // $(".call_bot_btn").removeClass();
        }

        // 프로파일 영역 처리
        if (!_config.isAuthed) {
          $(".info_area h4").html(
            "<h4>하나원큐 <strong>로그인</strong> 후<br>하이친밀도 확인이 가능합니다.</h4>"
          );
          $(".level_sec .thumb img").attr({
            src: `../image/ico_porfile_70_62_${0}.png`,
            alt: `친밀도 ${0}`,
          });
          $(".info_area .txt_level").html("Lv. 0");
        } else {
          const steps = [
            _config.user.accessView || "20200101 00:00:00",
            _config.user.accessTransfer || "20200101 00:00:00",
            _config.user.accessDialog || "20200101 00:00:00",
            _config.user.accessLocalTaxes || "20200101 00:00:00",
            _config.user.accessExchange || "20200101 00:00:00",
          ];

          let lvl = 0;
          steps.forEach((item, idx) => {
            const cnt = parseInt(
              moment
                .duration(moment().diff(moment(item, "YYYYMMDD hh:mm:ss")))
                .asDays()
            );
            if (_config.limitIntimacyDays > cnt) {
              $(".level_list li div").eq(idx).addClass("is_active");
              lvl++;
            }
          });

          $(".info_area .txt_level").html("Lv. " + lvl);
          if (lvl > steps.length) {
            $(".hi_level_area button").text("펼치기").toggleClass("open close");
            $(".level_content").slideUp();
          }

          $(".level_sec .thumb img").attr({
            src: `../image/ico_porfile_70_62_${lvl}.png`,
            alt: `친밀도 ${lvl}`,
          });
        }

        // 이름 출력
        $(".profile_area .customer_name").html(_config.custNm);

        // 만난날
        const duration = parseInt(
          moment
            .duration(
              moment().diff(moment(_config.FST_CONN_DTM, "YYYYMMDDhhmmddss"))
            )
            .asDays()
        );
        $(".profile_area .begin_met_date").html(duration + 1);

        // 이력보기는 로그인 일때만 노출
        if (!_config.isAuthed || _config.isDebug === false) {
          $(".sidebar_menu .menu_list .menu5").hide();
        } else {
          $(".sidebar_menu .menu_list .menu5").show();
        }

        // LIVEAGENT
        if (_config.useLiveagent) {
          $(".call_bot_btn").show();
        } else {
          $(".call_bot_btn").hide();
        }

        processShowHideMenu();

        Debug.log("config: ", _config);
      };
    },

    // CMD_SHARE : 공유하기
    // ---------------------------------------------------------------------------------------
    CmdShare: function (next) {
      Handler.Cmd.apply(this, ["CMD_SHARE", next]);

      this.toAct = function (msgObj) {
        const title = (msgObj || {}).title;
        const text = (msgObj || {}).text;
        const url = (msgObj || {}).url;

        if (navigator.share) {
          let sendInfo = {};
          if (title) {
            sendInfo.title = title;
          }
          if (text) {
            sendInfo.text = text;
          }
          if (url) {
            sendInfo.url = url;
          }

          navigator
            .share(sendInfo)
            .then(() => Debug.log("share success"))
            .catch((e) => Debug.log("share failed", e.toString()));

        } else {
          Debug.log("not support share");
          Debug.log("try Bridge.sendShareCommen");

          safeRun(() => {
            HanaBridge.sendShareComment(
              `${title || ''} ${text || ''} ${url || ''}`,
              (data) => {
                Debug.log('sendShareComment OK.');
              },
              (error) => {
                Debug.log(`sendShareComment Failed.`)
              }
            );
          });

        }
      };
    },

    // CMD_INPUT_TRANSFER_LIMIT : 이체한도입력 팝업호출 
    // ---------------------------------------------------------------------------------------
    CmdInputTransferLimit: function (next) {
      Handler.Cmd.apply(this, ["CMD_INPUT_TRANSFER_LIMIT", next]);

      let type_1day = 0;
      let type_1try = 0;

      function isValid(value, type) {
      // value 공백 처리
        if(!value) {return false}
        
        const money = Util.getNumber(value);
                	
        if (type == "1일 변경 후") {
          return !isNaN(money) && money > 0 && money <= type_1day;
        } else if (type == "1회 변경 후") {
          return !isNaN(money) && money > 0 && money <= type_1try;
        }

        return false;
      }

      this.toAct = function (msgObj) {
        const limit_money = (msgObj.data || {}).limit_money || 0;
        const current_limit_money =
          (msgObj.data || {}).current_limit_money || 0;
        type_1day = (msgObj.data || {}).type_1day || 0;
        type_1try = (msgObj.data || {}).type_1try || 0;
        const money_1day = (msgObj.data || {}).money_1day || 0;
        const money_1try = (msgObj.data || {}).money_1try || 0;
        const title = (msgObj.data || {}).title;

        showPopup(
          title || "이체한도 변경하기",
          null,
          {
            html: `
              <ul class="form_list">
                <li>
                  <p>변경전</p>
                  <input type="text" title="1일 이체한도 변경전" value="1일 ${limit_money.toLocaleString()}원" readonly>
                  <input type="text" title="1회 이체한도 변경전" value="1회 ${current_limit_money.toLocaleString()}원" readonly>
                </li>
                <li>
                  <p>1일 이체한도</p>
                  <input type="text" pattern="[0-9,원]*" inputmode="numeric" title="1일 변경 후" placeholder="최대 ${type_1day.toLocaleString()}원 입력 가능" value="${money_1day ? money_1day.toLocaleString() + "원" : ""}">                            
                </li>
                <li>
                    <p class="mar1">1회 변경 후</p>
                    <input type="text" pattern="[0-9,원]*" inputmode="numeric" title="1회 변경 후" placeholder="최대 ${type_1try.toLocaleString()}원 입력 가능" value="${money_1try ? money_1try.toLocaleString() + "원" : ""}">
                </li>
              </ul>
              <br><p style="font-size:13px;color:#7968dd;font-weight:500;">※ 최대 이체 한도 금액을 초과하여 원하시는 경우, 가까운 영업점을 방문하여 상담해주세요.</p>
            `,
          },
          true,
          {
            html: `
              <div class="button_bottom">
                <button type="button" disabled="disabled">확인</button>
              </div>
            `,
            init: function (attachId) {
              const input1 = $(".form_list input").eq(2);
              const input2 = $(".form_list input").eq(3);

              input1.on("input", function () {
                const isOk =
                  isValid(input1.val(), input1.attr("title")) &&
                  isValid(input2.val(), input2.attr("title"));
                if (isOk) {
                  $(".button_bottom button").attr("disabled", false);
                } else {
                  $(".button_bottom button").attr("disabled", true);
                }
              });

              input1.eq(0).on("keyup", function (key) {
                Util.updateTextView($(this));
              });

              input1.on("focus", function () {
                $(this).val($(this).val().replace(/원/, ""));
              });

              input1.on("blur", function () {
                $(this).val($(this).val() ? $(this).val() + "원" : "");
                if (isValid(input1.val(), input1.attr("title"))) {
                  input1.removeClass("error");
                  input1.addClass("is_active");
                } else {
                  input1.removeClass("is_active");
                  input1.addClass("error");
                }
              });

              input2.eq(0).on("keyup", function (key) {
                Util.updateTextView($(this));
              });

              input2.on("focus", function () {
                $(this).val($(this).val().replace(/원/, ""));
              });

              input2.on("input", function () {
                const isOk =
                  isValid(input1.val(), input1.attr("title")) &&
                  isValid(input2.val(), input2.attr("title"));
                if (isOk) {
                  $(".button_bottom button").attr("disabled", false);
                } else {
                  $(".button_bottom button").attr("disabled", true);
                }
              });

              input2.on("blur", function () {
                $(this).val($(this).val() ? $(this).val() + "원" : "");
                if (isValid(input2.val(), input2.attr("title"))) {
                  input2.removeClass("error");
                  input2.addClass("is_active");
                } else {
                  input2.removeClass("is_active");
                  input2.addClass("error");
                }
              });

              $(".button_bottom button").click(function () {
                if (!$(this).attr("disabled")) {
                  const _type_1day = input1.val();
                  const _type_1try = input2.val();
                  Util.sendMessage("", {
                    from: {
                      type_1day: Util.getNumber(_type_1day),
                      type_1try: Util.getNumber(_type_1try),
                    },
                  });
                  EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
                }
              });
            },
          }
        );
      };
    },

    // CMD_REQUIRE_APP_UPDATE - 원큐앱 업데이트 팝업 호출
    // ---------------------------------------------------------------------------------------
    CmdRequireAppUpdate: function (next) {
      Handler.Cmd.apply(this, ["CMD_REQUIRE_APP_UPDATE", next]);

      this.toAct = function (msgObj) {
        showPopup(
          '마이크 사용을 원하시면 하나원큐를<br />최신버전으로 업데이트 해주세요.',
          null,
          {
            html: `<p class="voice_hana1q"></p>`
          },
          true, {
          html: `
            <div class="button_bottom">
              <button type="button">업데이트</button>
            </div>
          `,
          init: function (attachId) {
            EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
            EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
                EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                ModalBSClose(`#${attachId}`, function () {
                  Util.detach(attachId);
                });
              }
            );

            $(".button_bottom button").click(function () {
              Util.sendMessage("업데이트로 이동", { from: { gotoAppUpdate: true } });
              EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
            });
          }
        }
        );
      };
    },

    // CMD_REQUIRE_OS_UPDATE - 단말기 os 업데이트 팝업 호출
    // ---------------------------------------------------------------------------------------
    CmdRequireOsUpdate: function (next) {
      Handler.Cmd.apply(this, ["CMD_REQUIRE_OS_UPDATE", next]);

      this.toAct = function (msgObj) {
        let message = "업데이트 해주세요.";

        if (_config.isAndroid) {
          message = '<h3 class="modal_tit">마이크 사용은 Android 5.0 이상에서<br />가능합니다. 스마트폰의 OS를<br />업데이트 해주세요.</h3>';
        }
        else if (_config.isIOS) {
          message = '마이크 사용은 iOS 15 이상에서<br />가능합니다. 아이폰의 OS를<br />업데이트 해주세요.';
        }

        showPopup(
          message,
          null,
          {
            html: `
              <p class="fa-microphone-ios"></p>
              <p class="text_voice">업데이트 후 다시 이용해 주세요.</p>
            `,
            init: function (attachId) {
              EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
              EventEmitter.subscribe(
                "EVT_CLOSE_POPUP" + attachId,
                (attachId) => {
                  EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
                  EventEmitter.unsubscribe("EVT_OK_POPUP" + attachId);
                  ModalBSClose(`#${attachId}`, function () {
                    Util.detach(attachId);
                  });
                }
              );
            }
          },
          true
        );

      };
    },

    CmdAlert: function (next) {
      Handler.Cmd.apply(this, ["CMD_ALERT", next]);

      this.toAct = function (msgObj) {
         const data = msgObj.data;

           alert(data || '알림');
      };
    },
    // 2023.01.26 상담원 재연결시 재연결 메세지 출력
    CmdCallRestart: function (next) {
      Handler.Cmd.apply(this,["CMD_CALL_RESTART", next]);
      
      this.toAct = function(){
            Util.sendMessage('상담직원 재연결');
      };
    },




    
  };

  const cmdHandlers = [
    Handler.CmdDebugOnOff,
    Handler.CmdShowPopup,
    Handler.CmdSearchBranch,
    Handler.CmdSelectFinancialInstitution,
    Handler.CmdSelectTransferAccount,
    Handler.CmdSelectAccount,
    Handler.CmdSecurePad,
    Handler.CmdExchangeRateGraph,
    Handler.CmdSelectDate,
    Handler.CmdLink,
    Handler.CmdSearchPickupPoint,
    Handler.CmdShowCalc,
    Handler.CmdRequestLogin,
    Handler.CmdAccountHistory,
    Handler.CmdInputEmail,
    Handler.CmdInputPhone,
    Handler.CmdInputMobile,
    Handler.CmdSelectPostReceive,
    Handler.CmdHambuger,
    Handler.CmdSelectList,
    Handler.CmdSendUserKey,
    Handler.CmdShare,
    Handler.CmdInputTransferLimit,
    Handler.CmdRequireAppUpdate,
    Handler.CmdRequireOsUpdate,
    Handler.CmdAlert,
    Handler.CmdCallRestart,
  ];
  
  let command = undefined;
  for (const cmdHandler of cmdHandlers) {
    command = new cmdHandler(command);
  }

// Postfront 이벤트 처리. CMD_...
  function runAction(msgObj) {
    Debug.log("action: ", (msgObj || "").command);
    Debug.log("msgObj: ", msgObj);

    // 마이크 지원하지 않는 플랫폼버전 및 앱버전 처리.
    if ((msgObj || {}).event == "start-stt") {

      const deviceVersion = _config.deviceVersion;
      const deviceAppVersion = _config.deviceAppVersion;

      if (_config.isAndroid) {
        const configVersion = `${_config.minAosVerForMic}`;
        const checkOs = isBelowVersion(configVersion, deviceVersion);
        if (checkOs) {
          command.act({ command: 'CMD_REQUIRE_OS_UPDATE', data: {} });
          return;
        }

        const configAppVersion = `${_config.minAosAppVerForMic}`;
        const checkApp = isBelowVersion(configAppVersion, deviceAppVersion);
        if (checkApp) {
          command.act({ command: 'CMD_REQUIRE_APP_UPDATE', data: {} });
          return;
        }
      }
      else if (_config.isIOS) {
        const configVersion = `${_config.minIosVerForMic}`;
        const checkOs = isBelowVersion(configVersion, deviceVersion);
        if (checkOs) {
          command.act({ command: 'CMD_REQUIRE_OS_UPDATE', data: {} });
          return;
        }

        const configAppVersion = `${_config.minIosAppVerForMic}`;
        const checkApp = isBelowVersion(configAppVersion, deviceAppVersion);
        if (checkApp) {
          command.act({ command: 'CMD_REQUIRE_APP_UPDATE', data: {} });
          return;
        }
      }

      return;
    }

    command.act(msgObj);
  }

// 사용자 질의 입력을 받은 후 후처리
  function postSent() {

    // update last chat
    _config.lastChat = moment().valueOf();

    // set focus to input
    setTimeout(() => {
      const inputElement = getInputElement();
      if (inputElement) {
        inputElement.addEventListener("focus", function (e) {
          Debug.log("Input Focus");
        });
      }
    }, 100);

    const alignCarousel = () => {
      return function() {

        const chatUiFrame = getChatUiFrame();

        if (_config.channel == 'web') {
          hideMicButton();
        }    
    
        // 캐러셀 모바일 디바이스별 터치대응
        $(chatUiFrame.document)
          .find(".flickity-viewport")
          .css({ "touch-action": _config.isIOS ? "pan-x" : "pan-y" });

        Debug.log('carousel cell(0) height: ', $(chatUiFrame.document).find(".flickity-slider>div").eq(0).css('height'));
                    
        // 캐러셀 높이 동일하게
        $(chatUiFrame.document)
          .find(".flickity-slider>div")
          .css({ height: "100%" });

        // 캐러셀 내부잘림현상 보정
        const viewports = $(chatUiFrame.document).find(".flickity-viewport");
        for(let i = 0; i < viewports.length; i++) {
          const currViewport = viewports.eq(i);
          const carousel = currViewport.find('.carousel-cell,type2');
          const bordT = carousel.outerHeight() - carousel.innerHeight();
          const paddT = carousel.innerHeight() - carousel.height();
          const margT = carousel.outerHeight(true) - carousel.outerHeight();
          const spacing = bordT + paddT + margT;

          let maxHeight = 0;
          const rows = currViewport.find('.carousel_flex_row');
          for(let k = 0; k < rows.length; k++) {
            const children = rows.eq(k).children();
            let childHeight = 0;
            for(let j = 0; j < children.length; j++) {
              const child = children.eq(j);
              childHeight += child.outerHeight(true);
            }  
            if (childHeight > maxHeight) {
              maxHeight = childHeight;	
            }
          }
          
          if(maxHeight > 0) {
            currViewport.css('height', maxHeight + spacing + 'px');	
          } 
        }
      }
    }
	  [500, 1000, 2000, 5000].map((delay) => setTimeout(() => (alignCarousel())(), delay));
	    
    // sys-error convert
    setTimeout(() => {
      const msgs = [
        '죄송합니다. 현재 답변을 드릴 수 없습니다. 창을 닫고 다시 접속해 주세요.',
        '메시지 전송에 실패했습니다.',
        '동일한 아이디로 다른 곳에서 접속하여 대화를 진행할 수 없습니다. 창을 닫고 다시 접속해 주세요.',
        '존재하지 않거나 사용할 수 없는 상태입니다.',
        '메시지 전송에 실패했습니다.',
        '메시지 처리에 실패했습니다.',
        '세션이 종료되었습니다.\n창을 닫고 다시 시작해 주시기 바랍니다.',
        '동작 중 오류가 발생하였습니다.',
        '일시적인 현상일 수 있으니, 창을 닫고 다시 시도해 주시기 바랍니다.'
      ];

      const chatUiFrame = getChatUiFrame();
  
      for(let i = 0, msg; msg = msgs[i]; i++) {
        const condition = `div .control-text:contains('${msg}')`;

        if ($(chatUiFrame.document).find(condition).length > 0) {
          $($(chatUiFrame.document).find(condition)[0]).parent().parent().html(`
            <div class="control-frame sys-error-msg">
              <div class="chat_basic" style="padding-top:0px">
                <div class="text_basic">
                  ${msg}
                </div>
              </div>
            </div>
          `);
          break;
        }
      }
    }, 500);
        
    processShowHideMenu();

    Debug.log("session valid until: ", moment(_config.lastChat).add(_config.chatbotSessionTimeout, "m").format("hh:mm:ss"));
  }

  function hideSplash() {
    $("#__splash").fadeOut('fast', function () {
      $("#__splash").remove();
      if (initIntervalId) {
        clearInterval(initIntervalId);
        initIntervalId = null;
      }
      unsetColor();
    });
  }

/*
 * CogInsight System에서 발생하는 약속된 이벤트 핸들러 등록 및 추가 
 * 
 * action : system action type      ex) CHAT_ACTION
 * data : custom data, postfront 이벤트 처리를 위해 사용
 * sessionKey : 이전이력보기에 사용(Optional)
 */
  function cogiEventHandler(event) {
    const { action, data, sessionKey } = JSON.parse(event.data || "");

    if (_config.channel == 'web') {
      hideMicButton();
    }    

    if (action) {
      Debug.log("cogi event: ", action);
      Debug.log("event payload: ", data || '');

      switch (action) {
        // 챗봇 시작시 발생하며, 초기 설정을 이 부분에 수행.
        case "CHAT_INIT":
          _config.sessionKey = sessionKey;

          setTimeout(() => {
            hideSplash();

            setTimeout(() => {
              const inputElement = getInputElement();
              if (inputElement) {
                inputElement.addEventListener("focus", function (e) {
                  Debug.log("Input Focus");
                });
              }
            }, 100);

            Debug.log("Chatbot ready\n", _config);

            // 2023.04.19 상단 UI 스크립트
            setTimeout(() => {
            	walletInteraction();
            }, 800);
                        
            if (_config.useMic) {
              if (_config.isAndroid) {

                  const configVersion = `${_config.minAosVerForMic}`;
                  const configAppVersion = `${_config.minAosAppVerForMic}`;
                  const checkOs = isBelowVersion(configVersion, deviceVersion);
                  const checkApp = isBelowVersion(configAppVersion, deviceAppVersion);
                  
                  if (!checkOs && !checkApp) {

                    try {
                      HanaBridge.checkPermission(
                        ["RECORD_AUDIO"],
                        function (rData) {
                          Debug.log("AOS checkPermission(): OK");
                        },
                        function (rData) {
                          Debug.log("AOS checkPermission(): None");
                          HanaBridge.goSetting("마이크 권한을 설정해 주세요.");
                        }
                      );
                    } catch (e) {
                      Debug.log("error checkPermission(): ", e.toString());
                    }    
                  }

              } else if (_config.isIOS) {

                const configVersion = `${_config.minIosVerForMic}`;
                const configAppVersion = `${_config.minIosAppVerForMic}`;
                const checkOs = isBelowVersion(configVersion, deviceVersion);
                const checkApp = isBelowVersion(configAppVersion, deviceAppVersion);
        
                if (!checkOs && !checkApp) {

                  try {
                    HanaBridge.checkPermission(
                      ["SPEECH_TO_TEXT", "RECORD_AUDIO"],
                      function (rData) {
                        Debug.log("IOS checkPermission(): OK");
                      },
                      function (rData) {
                        Debug.log("IOS checkPermission(): None");
                        HanaBridge.goSetting("마이크 권한을 설정해 주세요.");
                      }
                    );
                  } catch (e) {
                    Debug.log("error checkPermission(): ", e.toString());
                  }
                }
              }
            }

          }, 0);

          if ((data || {}).sessionTimeout) {
            _config.chatbotSessionTimeout =
              parseInt(data.sessionTimeout) || _config.chatbotSessionTimeout;
          }

          if (_config.channel == 'web') {
            hideMicButton();
          }    
  
          break;
          
        // 챗봇에서 WRAP 이벤트를 전달할 경우 발생. (주로 사용되는 이벤트)
        case "CHAT_ACTION":
          if (data) {
            try {
              const obj = JSON.parse(data);
              runAction(obj);
            } catch (e) {
              Debug.log(e.toString());
            }
          }
          break;
          
        // 유저가 챗봇에 질의를 전송하면 발생.
        case "CHAT_MESSAGE_SENT":
          // postSent();
          break;
          
        // 챗봇이 응답 후 발생
        case "CHAT_MESSAGE_RECEIVED":
          postSent();

          // 자동발화 처리 - 테스트 용도
          const getQuestion = () => {
            let question = _config.autoQuestion;
            
            if (Array.isArray(question)) {
                question = _config.autoQuestion.shift();
                if (_config.autoQuestion.length === 0) {
                  _config.autoQuestion = null;
                }
            }
            else {
              _config.autoQuestion = null;
            }

            return question;
          }

          const isExistAutoQuestion = () => {
            Debug.log('curr autoQuestion: ', _config.autoQuestion);
            return (_config.autoQuestion || '').length > 0
          }

          if (isExistAutoQuestion()) {
            setTimeout(() => {
              const question = getQuestion();
              Util.sendMessage(question);
              Debug.log('sent autoQuestion: ', question);
            }, 500);
          }          
          break;

        default:
          break;
      }
    }
  }
// cogiEventHandler End

// 일부 메뉴는 조건에 따라 노출여부 결정
  function processShowHideMenu() {
    // 메뉴: 이전대화보기(최근 1주일)
    if (!_config.isAuthed) {
      if (!_config.isDebug) {
        $(".sidebar_menu .menu_list .menu5").hide();
      } else {
        $(".sidebar_menu .menu_list .menu5").show();
      }
    } else {
      $(".sidebar_menu .menu_list .menu5").show();
    }
  }

// hambuger 메뉴 숨김
  function hideMenu(cb, isNoAnimation) {

    $('#kebhai_chatframe').attr('aria-hidden', 'false');
    $('.wrap>header').attr('aria-hidden', 'false');    

    $(".menu_bg").hide();
    
    $("body").removeClass("scroll_hidden");

    if (isNoAnimation) {
      $(".sidebar_menu").hide();
    }
    else {
      $(".sidebar_menu").animate(
        {
          left: "-" + 100 + "%",
        },
        function () {
          $(".sidebar_menu").hide();
          if (cb) {
            cb();
          }
        }
      );
    }
  }

  // CogInsight 이벤트 및 UI 이벤트 등록을 위한 핸들러 초기화
  function initHandler() {
    window.addEventListener("message", cogiEventHandler);

    $("header>h1").click((event) => {
      if (_config.isDebug) {
        event.preventDefault();
        Debug.toggle();
      }
    });

    // LIVEAGENT 상담사연결 버튼 클릭
    $(".call_bot_btn").click((event) => {
      Util.sendMessage('상담직원 연결');
    });
    
    // LIVEAGENT 챗봇나가기 버튼 클릭
    // 2023.01.19 liveChatCheck 추가
    $(".chat_close_btn").click((event) => {
      Debug.log("close chatbot");
      
      let confirmCheck = $("iframe").contents().find(".chat-center-root > .chat-center-content > .livechat-confirm").length;

    // 2023.06.27 상담종료확인창 종료 시 방어로직 추가 jh
      // 상담종료 확인창 있을경우 반응 X
      if(confirmCheck > 0){
	      // $(".chat-center-root").remove();
	      return;
      }else{ // 상담종료 확인창 없을경우 만족도 체크
        liveChatCheck();
      }
      
    });

    $("#__splash").click((event) => _config.isDebug && Debug.toggle());

    $(".menu_list>li").click(".menu_list>li", (event) => {
      const btnLabel = $(event.delegateTarget).find("a:first")[0].innerText;
      if (btnLabel === "하이챗봇 알아보기") {
        showPopupPreview();
      } 
      else if (btnLabel === "FAQ") {
        showPopupFaq();
      } 
      else if (btnLabel === "이전대화보기(최근 1주일)") {
        showPopupHistory();
      } 
      else if (btnLabel === "하이챗봇 카카오톡 친구추가") {
        openKakaoPage();
        hideMenu();
      } else {
        hideMenu(function () {
          Util.sendMessage($(event.delegateTarget).find("a:first")[0].innerText);
        });
      }
    });

  }

  let loadingId = null;
  
  // 프로그래스 노출
  function showLoading() {
    hideLoading();

    const attach = (target, content, init, targetId) => {
      let id = targetId || null;

      if (target) {
          if (!id) {
              id = Util.uuid4();
          }
          const _content = $(content);
          _content.attr('id', id);

          const findTarget = (target) => {
            const ret = $(target);
    
            if (ret.length > 1) {
                ret[0];
            }
            return ret;
          }          

          const tgt = findTarget(target);
          tgt.append(_content);

          if (init) {
              init(id);
          }
      }

      return id;
    }

    loadingId = Util.uuid4();
    attach(
      ".wrap",
      `
        <div class="progress_wrap" id="${loadingId}">
          <div class="inner">
              <span class="myfirst"></span>
              <span class="mysecond"></span>
              <span class="mythird"></span>
          </div>
        </div>      
      `,
      null,
      loadingId     
    );
    console.log('>> showLoading loadingId: ', loadingId);
  }

// 프로그래스 숨김
  function hideLoading() {
    console.log('>> hideLoading loadingId: ', loadingId);

    if(loadingId) {
      const detach = (targetId) => {
        if (targetId) {
            const tgt = Util.findTarget(`#${targetId}`);
  
            if (tgt.length > 0) {
                tgt.remove();
            }
        }
      }    
  
      detach(loadingId)
      loadingId = null;
    }
  }
/*
 * showPopup(제목, 헤더 컨텐츠객체, 바디 컨텐츠객체, 높이자동가부, 푸터 컨텐츠객체)
 * 
 * 컨텐츠 객체
 * descript: 헤더에만 해당, 타이틀 바로 아래 텍스트,
   html: UI를 구성하는 태그 스트링,
   init: 생성된 UI에 이벤트 연결 및 후속처리 콜백,
 *  팝업자동높이 : boolean 또는 픽셀높이
 *  
 */
  function showPopup(title, header, content, isDynamicHeight = true, additional) {
    const attachId = Util.uuid4();
    const descript = (header || {}).descript;
    const headerHtml = (header || {}).html;
    const contentHtml = (content || {}).html;
    const contentDimmer = (content || {}).dimmer;
    const additionalHtml = (additional || {}).html;
    const data = (header || {}).data;

    const height = $(".wrap").height();
    Util.attach(
      ".wrap",
      `
        <div class="modal_wrap" id="${attachId}">
          <div 
            class="modal modal_bottomsheet modal_search" 
            ${
              typeof isDynamicHeight == "number"
                ? `style="width:100%;height:${isDynamicHeight}px;"`
                : isDynamicHeight ? "" : `style="height:${height - 56}px;width:100%;"`
            }
          >
            <div class="modal_header">                
              <h3 class="modal_tit" tabindex="0" title="${title||""}">${title || ""}</h3>
              ${descript ? `<p class="modal_desp">${descript}</p>` : ""}
              ${headerHtml ? headerHtml : ""}
            </div>
            <div class="modal_content">
              ${contentHtml ? contentHtml : ""}                        
            </div>
            ${additionalHtml || ""}
            <button type="button" class="modal_close_btn"><span class="blind">닫기</span></button>
          </div>
          <div class="dimmer${contentDimmer ? ' bg': ''}" aria-hidden="true"></div>
        </div>
      `,
      function (attachId) {
        EventEmitter.subscribe("EVT_CLOSE_POPUP" + attachId, (attachId) => {
          EventEmitter.unsubscribe("EVT_CLOSE_POPUP" + attachId);
          ModalBSClose(`#${attachId}`, function () {
            Util.sendMessage("");
            Util.detach(attachId);

            focusToTitle();

          });
        });

        $(`#${attachId} .modal_close_btn`).click(function () {
          EventEmitter.dispatch("EVT_CLOSE_POPUP" + attachId, attachId);
        });

        if ((header || {}).init) {
          header.init(attachId, data);
        }

        if ((content || {}).init) {
          content.init(attachId);
        }

        if ((additional || {}).init) {
          additional.init(attachId);
        }

        setTimeout(() => {
          ModalBSOpen(`#${attachId}`, () => $('.modal_tit').last().focus());
        }, 0);
      },
      attachId
    );
  }

  function showPopupPreview() {
    setTimeout(() => {
      $('.sidebar_menu').attr('aria-hidden', 'true');

      const attachId = Util.attach(
        ".wrap",
        `
          <div style="position:absolute;top:0;height:100%;width:100%;background-color:white;display:none;left:-100%;z-index:101;">

            <!-- header -->
            <header  style="background-color:white">
              <div class="back_btn">
                <a href="#none" title="이전">
                <!--
                  <span class="sr-only">이전</span>
                 -->
                </a>
              </div>
              <h1 tabindex="0">하이챗봇 알아보기</h1>
            </header>
            <!-- // header -->
      
            <!-- container -->
            <div class="container hi_swiper_wrap">
    
              <!-- Swiper -->
              <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="slide_content_type1">
                      <h2>
                        여러분의 AI 금융비서<br />
                        <span>하이챗봇</span>을 소개합니다
                      </h2>
                      <p>하이챗봇은 간단한 뱅킹부터 상담까지<br />24시간 도와드리고 있어요.</p>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="slide_content_type2">
                      <h2>
                        어떤 <span>뱅킹서비스</span>를<br />
                        이용할 수 있나요?
                      </h2>
                      <p>이체, 환전, 지방세 납부 서비스를 제공해요.<br />
                        <span>이체할래,환전할래,지방세 납부해줘</span>라고<br />
                        하이챗봇에 입력해 주세요!
                      </p>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="slide_content_type3">
                      <h2>
                        어떤 <span>금융상품</span>이<br />
                        가능한가요?
                      </h2>
                      <p>손님에게 최적화된 <span>개인화 상담</span>을 제공해요.</p>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="slide_content_type4">
                      <h2>
                        <span>빅데이터</span>를 이용해<br />
                        혜택 안내를 드리고 있어요.
                      </h2>
                      <p>놓치고 있는 혜택은 없는지<br />하이챗봇에서 확인해보세요!</p>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="slide_content_type5">
                      <h2>
                        챗봇에 <span>짧고 간단하게</span><br />
                        질문해주세요!
                      </h2>
                      <p>문장에 오타가 있거나 띄어쓰기가 없다면<br />답변이 어려울 수 있어요.</p>
                    </div>
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
            </div>
            <!-- // container -->
          
          </div>
        `,
        function (attachId) {
          // close
          $(`.back_btn`).click(function () {
            $('.sidebar_menu').attr('aria-hidden', 'false');

            $(`#${attachId}`)
              .show()
              .animate(
                {
                  left: "-" + 100 + "%",
                },
                function () {
                  Util.detach(attachId);
                  
                  focusToTitle();

                  if (!(_config.isAndroid || _config.isIOS)) {
                    setTimeout(() => {
                      hideMenu(null, true);
                    }, 0);
                  }
                
                }
              );
          });

          // appear
          $(`#${attachId}`).show().animate({
            left: 0,
          }, () => {
            focusToTitle();
          });

          var swiper = new Swiper(".mySwiper", {
            direction: "vertical",
            slidesPerView: 1,
            spaceBetween: 30,
            mousewheel: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            /* 웹접근성 추가 200927 */		
            on: {
              init: function(swiper){
                $('.swiper-slide').attr('aria-hidden','true');
                $('.swiper-slide-active').attr('aria-hidden','false');
              },
              /* 웹접근성 추가 221005 */
              slideChange: function(swiper){
                $('.swiper-slide').attr('aria-hidden','true');
                setTimeout(function(){
                  $('.swiper-slide-active').attr('aria-hidden','false');
                }, 0);
              },	
            },      
          });
        }
      );

    }, 0);
  }

// FAQ 팝업호출
  function showPopupFaq() {
    setTimeout(() => {
      $('.sidebar_menu').attr('aria-hidden', 'true');

      const attachId = Util.attach(
        ".wrap",
        `
          <div style="position:absolute;top:0;height:100%;width:100%;background-color:white;display:none;left:-100%;z-index:101;">

            <!-- header -->
            <header  style="background-color:white">
              <div class="back_btn">
                <a href="#none" title="이전">
                <!--
                  <span class="sr-only">이전</span>
                -->
                </a>
              </div>
              <h1 tabindex="0">FAQ</h1>
            </header>
            <!-- // header -->
        
            <!-- container -->
            <div class="container"  style="overflow-y:auto">
                
              <!-- faq -->
              <dl class="faq_list">
              </dl>
              <!-- // faq -->
        
            </div>
            <!-- // container -->
          
          </div>
        `,
        function (attachId) {
          // close
          $(`.back_btn`).click(function () {
            $('.sidebar_menu').attr('aria-hidden', 'false');
            $(`#${attachId}`)
              .show()
              .animate(
                {
                  left: "-" + 100 + "%",
                },
                function () {
                  Util.detach(attachId);

                  focusToTitle();
                  
                  if (!(_config.isAndroid || _config.isIOS)) {
                    setTimeout(() => {
                      hideMenu(null, true);
                    }, 0);
                  }
                
                }
              );
          });

          // appear
          $(`#${attachId}`).show().animate({
            left: 0,
          }, () => {
            focusToTitle();
          });

          // load faq
          const origin = Util.getOrigin();

          setTimeout(() => showLoading(), 0);

          const faqUrl = getApiUrl('faq');
          Debug.log('-----> wrap api (faq): ', faqUrl);
  
          fetch(origin + faqUrl)
            .then((response) => response.json())
            .catch((e) => {
              Debug.log(e.toString());
              Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
            })
            .then((data) => {
              let faqList = data.result || [];
              faqList = faqList.sort((a, b) => (a.order || 0) - (b.order || 0));
              faqList = faqList.map((item) => ({
                ...item,
                que: item.que.replace(/\\n/g, ''),
                anw: item.anw.replace(/\\n/g, '')
              }));
              const faqContext = faqList.reduce((accu, item) => {
                return (
                  accu + `
                    <dt role="button">
                      <span>Q</span>
                      <p>${item.que}</p>
                    </dt>
                    <dd>
                      <div>
                        <span>A</span>
                        <p>${item.anw}</p>
                      </div>
                    </dd>
                  `
                );
              }, "");

              $(".faq_list").html(faqContext);

              //faq
              $(".faq_list>dt>a").click(function () {
                $(this)
                  .next()
                  .slideToggle(200)
                  .slideToggle(500)
                  .siblings("dd")
                  .slideUp();
              });

              // (Optional) Active an item if it has the class "is-active"
              $(".faq_list > dt.is_active").next("dd").slideDown();

              $(".faq_list > dt").click(function() {
                // Cancel the siblings
                $(this).siblings("dt").removeClass("is_active").next("dd").slideUp();
                $(this).attr('aria-expanded','true');/* 웹접근성 추가 220927 */
                $(this).siblings("dt").attr('aria-expanded','false');/* 웹접근성 추가 220927 */
                
                // Toggle the item
                $(this).toggleClass("is_active").next("dd").slideToggle("ease-out");
                $(this).not(".is_active").attr('aria-expanded','false');/* 웹접근성 추가 221011 */
              });

              hideLoading();
            })
            .catch((e) => {
              Debug.log(e.toString());

              hideLoading();
            });
        }
      );
    }, 0);
  }

// 이전이력보기 팝업호출
  function showPopupHistory() {
    setTimeout(() => {
      $('.sidebar_menu').attr('aria-hidden', 'true');

      const attachId = Util.attach(
        ".wrap",
        `
          <div style="position:absolute;top:0;height:100%;width:100%;background-color:white;display:none;left:-100%;z-index:101;">

              <!-- header -->
            <header  style="background-color:white">
              <div class="back_btn">
                <a title="이전">
                <!--
                  <span class="sr-only">이전</span>
                -->
                </a>
              </div>
              <h1 tabindex="0">이전대화보기</h1>
            </header>
            <!-- // header -->
        
            <!-- container -->
            <div class="container">
              <iframe style="width:100%;height:100%;border:0px;">
            </div>
            <!-- // container -->
          
          </div>
        `,
        function (attachId) {
          // close
          $(`.back_btn`).click(function () {
            $('.sidebar_menu').attr('aria-hidden', 'false');

            $(`#${attachId}`)
              .show()
              .animate(
                {
                  left: "-" + 100 + "%",
                },
                function () {
                  Util.detach(attachId);
                  
                  focusToTitle();

                  if (!(_config.isAndroid || _config.isIOS)) {
                    setTimeout(() => {
                      hideMenu(null, true);
                    }, 0);
                  }
                }
              );
          });

          // appear
          $(`#${attachId}`).show().animate({
            left: 0,
          }, () => {
            focusToTitle();
          });

          const origin = Util.getOrigin();
          const chatHistoryUrl = getApiUrl('chatHistoryUrl');
          Debug.log('-----> wrap api: ', chatHistoryUrl);

          const url = `${origin}${chatHistoryUrl}?projectId=${_config.projectId}&token=${_config.sessionKey}&days=7`;
          Debug.log("set history url");

          const ifrm = $(`#${attachId} iframe`);
          ifrm.attr("src", url);
          
          ifrm.on('load', function() {
            const chatFrame  = $(this).contents().find('#chat-ui-frame-0');							
            setTimeout(() => {
              chatFrame.contents().find('.control-frame').css("pointer-events", "none");
            }, 1500);
	        });
        }
      );
    }, 0);
  }
// 카카오페이지 브라우저로 오픈
  function openKakaoPage() {

      const kakaoPageUrl = getApiUrl('kakaoPage');
      Debug.log('-----> wrap api (kakaoPage): ', kakaoPageUrl);

      const url = kakaoPageUrl;
      try {
        HanaPartner.newBrowser(url);
      } catch (e) {
        Debug.log("HanaPartner.newBrowser error: ", e.toString());
        Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
      }
      // hideMenu();
  }

// 이전 챗봇에서 마지막발화값 가져오기
  function getPrevQuestion() {
    Debug.log("try getGlobalVariable()");

    return new Promise((resolve) => {
      let ret = null;

      const timerId = setTimeout(() => {
        Debug.log("timeout getGlobalVariable");
        resolve(ret);
      }, 3000);

      try {
        HanaPartner.getGlobalVariable(
          "prevQuestion",
          (data) => {
            Debug.log("result: ", data);

            ret = ((data || {}).res || {}).prevQuestion;
            Debug.log("ret: ", ret);

            if (ret) {
              setTimeout(() => {
                Debug.log("try setGlobalVariable() with Emtpy");
                try {
                  HanaPartner.setGlobalVariable(
                    "prevQuestion",
                    null,
                    (data) => {
                      Debug.log("result: ", data);
                    },
                    (e) => {
                      Debug.log("HanaPartner.getGlobalVariable error: ", e);
                    }
                  );
                } catch (e) {
                  Debug.log(
                    "> HanaPartner.getGlobalVariable error: ",
                    e,
                    e.toString()
                  );
                }
              }, 500);
            }
            clearTimer(timerId);
            resolve(ret);
          },
          (e) => {
            Debug.log("HanaPartner.getGlobalVariable error: ", e);
            Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
            clearTimer(timerId);
            resolve(ret);
          }
        );
      } catch (e) {
        Debug.log("> HanaPartner.getGlobalVariable error: ", e, e.toString());
        clearTimer(timerId);
        resolve(ret);
      }
    });
  }

  // 모바일 플랫폼 체크
  function checkPlatform(userAgent) {
    if (userAgent && userAgent.platform) {
      const platform = userAgent.platform;

      if (platform.match(/android/i)) {
        _config.isAndroid = true;
      }
      else if (platform.match(/iphone/i)) {
        _config.isIOS = true;
      }
    }
  }
  // 백버튼 구현 20230216
  function backBtnCheck(){
    HanaPartner.backBtn(function(){
      Debug.log('클릭이벤트');
      hideMenu();
    });
  }
  

  // 버전에 따른 음성입력 사용가능 체크
  function checkVersionForMic(userAgent) {
    let enabledMic = true;

    if (userAgent) {
      const platform = userAgent.platform;
      const platformVersion = userAgent.version;
      const appVersion = userAgent.appVersion;

      if (platform && platformVersion && appVersion) {
        const deviceVersion = `${platformVersion}`;
        const deviceAppVersion = `${appVersion}`;

        _config.deviceVersion = deviceVersion;
        _config.deviceAppVersion = deviceAppVersion;

        if (platform.match(/android/i)) {
          const configVersion = `${_config.minAosVerForMic}`;
          const configAppVersion = `${_config.minAosAppVerForMic}`;

          const checkOs = isBelowVersion(configVersion, deviceVersion);
          const checkApp = isBelowVersion(configAppVersion, deviceAppVersion);
          enabledMic = !(checkOs || checkApp)
        }
        else if (platform.match(/iphone/i)) {
          const configVersion = `${_config.minIosVerForMic}`;
          const configAppVersion = `${_config.minIosAppVerForMic}`;

          const checkOs = isBelowVersion(configVersion, deviceVersion);
          const checkApp = isBelowVersion(configAppVersion, deviceAppVersion);
          enabledMic = !(checkOs || checkApp)
        }
      }
    }

    return enabledMic;
  }


  // 챗봇 시작
  async function connectChatbot() {
    Debug.log("req href: ", window.location.href);

    const params = Util.getParams();
    Debug.log("params: ", params);

    const origin = Util.getOrigin();
    Debug.log("origin: ", origin);

    const url = origin + "/aicc/soe/service/#/";

    // 챗봇ID
    const projectId = params.projectId;
    // 로그인 사용자의 경우 전달됨.
    const token = params.accessToken;
    // 챗봇진입시 앱화면ID
    const appScrId = params.appScrId;
    // 앱to챗봇 전달 파라메터 TID
    const tid = params.tid;

    // 챗봇ID 유무체크
    if (!projectId) {
      Debug.log("projectId is null.");
      return;
    }
    _config.projectId = projectId;

    // 로그인 사용자인지 체크
    _config.isAuthed = Boolean(token);
    if (_config.isAuthed) {
      _config.token = token;
    }
    

    // 비로그인에서 로그인으로 전환시, 이전 마지막발화 가져오기
    let input = token ? { text: await getPrevQuestion() } : {};
    Debug.log("prev input: ", input);

    // 챗봇URL에 직접 전달된 파라메터 처리
    if (params.input) {
      try {
        let paramsInput = JSON.parse(params.input);
        Debug.log("params input: ", paramsInput);

        // IRQA 미리보기 일경우, 응답에 포함된 버튼 이벤트 비활성화
        const isPreviewIrqa = Boolean((paramsInput.data || {}).answerVw);
        if (isPreviewIrqa) {
          $("div.all_menu_btn").css("pointer-events", "none");
          $("a.call_bot_btn").css("pointer-events", "none");
          $("a.call_bot_btn").css("pointer-events", "none");
        }

        // 자동발화가 있을경우 등록
        _config.autoQuestion = ((paramsInput.data || {}).debug || {}).autoQuestion;
        
        // input 병합
        input = { ...input, ...paramsInput };
        
      } catch (e) {
        Debug.log("params.input parse error: ", e.toString());
      }
    }

  if (_config.isAuthed) {
    let userAgent = null;

    try {
      userAgent = JSON.parse((window.navigator || {}).userAgent);
    } catch (e) {
      Debug.log("userAgent parse error: ", e.toString());
    }
    
    Debug.log('userAgent parse: ', userAgent)

    input.data = {
      ...(input.data || {}),
      userAgent: userAgent || {raw: (window.navigator || {}).userAgent || 'no userAgent'},
    };
  }
  
  if (!input.data) {
    input.data = {};
  }

  // 접속채널 구분정보 설정
  if (!input.data.channel || (input.data.channel != 'app' && input.data.channel != 'web')) {
    input.data.channel = (_config.isAndroid || _config.isIOS) ? 'app' : 'web';
  }

  _config.channel = input.data.channel;

  // 접속채널이 웹 일경우 헤더 감춤
  if (input.data.channel == 'web') {
    $('header').hide();
    $('.container').css('padding', '0px');
    
    // 2023.01.19 접속채널이 웹일경우 상담중 나가기 버튼클릭시 상담종료
    window.onbeforeunload = function() {
    // 2023.06.28 상담종료 팝업 제거
      $("iframe").contents().find(".chat-center-root").remove();
	    $("iframe").contents().find("iframe").contents().find("div.livechat-end-button > img").click();
	    return "";
	}
  }
  
  // 앱에서 챗봇진입
  if (appScrId) {
    input.data.appScrId = appScrId;
    if (params.errorMsgCode) {
      input.data.errorMsgCode = params.errorMsgCode;
    }
  //여기백버튼
  } 
  
	// 아웃바운드 선톡 처리
	if (tid) {    
	  input.data.almId = tid;
	}
		
    setTimeout(() => {
      let target = `${url}${projectId}?origin=${origin}`;
      if (token) {
        target += "&token=" + token;
      }
      if (input) {
        target += "&input=" + encodeURIComponent(JSON.stringify(input));
      }

      // 실행 플랫폼 검사
      checkPlatform();

      // 상태바 색상설정
      setColor();

      // WebRTC 지원버전 체크 (마이크 사용가능한 버전인지 체크)
      if (!checkVersionForMic(((input || {}).data || {}).userAgent)) {
        target += `&feature=native_audio_recording`;
      }

      Debug.log("target: ", target);

      const chatbot = $("#kebhai_chatframe");
      chatbot.on("load", function () {
        Debug.log("chatbot has loaded.");

        if (_config.isDev) {
          const updated = moment(new Date(document.lastModified)).format("MM/DD hh:mm");
          $("#__chatbot_wrap_upated_info").html("updated: " + updated);
        }

        initIntervalId = setInterval(() => {
          Debug.log("wait for chatbot initlizing... ");
        }, 1000);

        setTimeout(() => {
          if (initIntervalId) {
            Debug.log("too late. It could be an error.");
            clearInterval(initIntervalId);
            initIntervalId = null;
          }
        }, _config.delayLimitToChatbotInit || 20000);
      });

      chatbot.on("error", function () {
        Debug.log("error occurred while chatbot loading.");
      });

      Debug.log("request chatbot to ", target);
      chatbot.attr("src", target);
    }, 0);
    
    (() => {
      let prevVisualViewport = 0;

      function handleVisualViewportResize() {
        const currentVisualViewport = window.visualViewport.height;

        if (
          prevVisualViewport - 30 > currentVisualViewport &&
          prevVisualViewport - 100 < currentVisualViewport
        ) {
          const scrollHeight = window.document.scrollingElement.scrollHeight;
          const scrollTop = scrollHeight - window.visualViewport.height;

          window.scrollTo(0, scrollTop); // 입력창이 키보드에 가려지지 않도록 조절
        }

        prevVisualViewport = window.visualViewport.height;
      }

      window.visualViewport.onresize = handleVisualViewportResize;
    })();
    
  }

  // bridge(앱 모바일) 기능 호출
  function experiment() {

    // grab appl session
    try {
      Debug.log("grabSession");
      HanaPartner.grabSession();
    } catch (e) {
      Debug.log("HanaPartner.grabSession() error: ", e.toString());
      Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
    }

    safeRun(() => Debug.log("check Android(mips): ", Boolean(window.miaps.isAndroid())));
    safeRun(() => Debug.log("check IOS(mips): ", Boolean(window.miaps.isIOS())));
    safeRun(() => Debug.log("user agent: ", (window.navigator || {}).userAgent));

    let _userAgent = {};
    safeRun(() => _userAgent = JSON.parse((window.navigator || {}).userAgent));
    safeRun(() => (_config.isAndroid = window.miaps.isAndroid() && (_userAgent.platform || '').match(/android/i)));
    safeRun(() => (_config.isIOS = window.miaps.isIOS() && (_userAgent.platform || '').match(/iphone/i)));
    
    // 2022.11.25 userAgent parse 에러날 경우 userAgent 없이 miaps 값만 setting 
    safeRun(() => {
        if(!_config.isAndroid && !_config.isIOS) {
        	_config.isAndroid = window.miaps.isAndroid();
        	_config.isIOS = window.miaps.isIOS();
        }
    });
    
    try {
      HanaPartner.getAppInfo((data) => {
        _config.appInfo = data;
      });
    } catch (e) {
      Debug.log("HanaPartner.getAppInfo error: ", e, e.toString());
      Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
    }
  }

  // 챗봇 인스턴스가 있음을 나타내는 저장소의 기록삭제
  function eraseChatbotInstanceMark(cb) {

    try {
      HanaPartner.setGlobalVariable(
        "isExistChatbotInstance",
        null,
        (data) => {
          Debug.log("remove instance mark result: ", data);
          cb();
        },
        (e) => {
          Debug.log("HanaPartner.getGlobalVariable error: ", e);
          cb();
        }
      );
    } catch (e) {
      Debug.log("> HanaPartner.getGlobalVariable error: ", e, e.toString());
      Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
      cb();
    }
  }

  // 실행된 챗봇 인스턴스가 있는지 저장소의 기록으로 체크
  function isExistChatbotInstance() {

    Debug.log('check "isExistChatbotInstance"');

    return new Promise((resolve) => {
      let ret = null;
      if (_config.isIOS || _config.isAndroid) {
        try {
          HanaPartner.getGlobalVariable(
            "isExistChatbotInstance",
            (data) => {
              ret = ((data || {}).res || {}).isExistChatbotInstance;
              if (!ret) {
                try {
                  HanaPartner.setGlobalVariable(
                    "isExistChatbotInstance",
                    true,
                    (data) => {
                      Debug.log("result(no exist instance): ", data);
                      resolve(false);
                    },
                    (e) => {
                      Debug.log("HanaPartner.getGlobalVariable error: ", e);
                      resolve(false);
                    }
                  );
                } catch (e) {
                  Debug.log(
                    "> HanaPartner.getGlobalVariable error: ",
                    e,
                    e.toString()
                  );
                  Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
                  resolve(false);
                }
              } else {
                resolve(true);
              }
            },
            (e) => {
              Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
              resolve(false);
            }
          );
        } catch (e) {
          Debug.log("> HanaPartner.getGlobalVariable error: ", e, e.toString());
          Util.sendMessage("기능수행에 일시적인 오류가 발생했습니다.", { from: { logStatus: 'error', payload: e.toString() } });
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }
  
  // 테스트 및 개발을 위한 함수
  function forTest() {
    hideSplash();
/*    
    command.act({
      command: "CMD_ALERT",
      data: "테스트"
    })
*/    

  /*
    command.act({
      command: "CMD_SHOW_POPUP",
      data: {
        title: "알림",
        descript: "일시적인 장애가 발생했습니다.</br> 잠시후 다시 시도해 주세요."
      },
    });
  */

  /*
    function getDummyGraphData() {
      return {
        dummy: [
          { REG_DT: "20220722", DEAL_BASC_RT: 1329.05 },
          { REG_DT: "20220723", DEAL_BASC_RT: 1329.03 },
          { REG_DT: "20220726", DEAL_BASC_RT: 1323.14 },
          { REG_DT: "20220727", DEAL_BASC_RT: 1324.05 },
          { REG_DT: "20220728", DEAL_BASC_RT: 1329.05 },
          { REG_DT: "20220729", DEAL_BASC_RT: 1329.02 },
          { REG_DT: "20220801", DEAL_BASC_RT: 1331.05 },
          { REG_DT: "20220803", DEAL_BASC_RT: 1332.05 },
          { REG_DT: "20220804", DEAL_BASC_RT: 1333.05 },
          { REG_DT: "20220805", DEAL_BASC_RT: 1334.05 },
          { REG_DT: "20220808", DEAL_BASC_RT: 1339.05 },
          { REG_DT: "20220809", DEAL_BASC_RT: 1342.05 },
          { REG_DT: "20220810", DEAL_BASC_RT: 1340.05 },
        ],
      };
    }
    command.act({ command: "CMD_EXCHANGE_RATE_GRAPH", data: getDummyGraphData() });
  */

  /*
    command.act({ command: 'CMD_REQUIRE_APP_UPDATE', data: {} });
  */

  /*
    command.act({ command: 'CMD_REQUIRE_OS_UPDATE', data: {} });
  */

  /*
    command.act({ command: 'CMD_SELECT_DATE', data: {} });
  */
  }
 
  // 2023.01.19 - 나가기버튼 클릭시 상담중일경우 상담해제, 아닐경우 챗봇종료
  function liveChatCheck() {
     // 상담중일 경우 : 1, 아닐경우 : 0
      const liveChatFlag = $("iframe").contents().find("iframe").contents().find("div.livechat-end-button > img");
      
      if(liveChatFlag.length == 1) {
         liveChatFlag.click();
      } else {
         eraseChatbotInstanceMark(() => {
             safeRun(() => HanaPartner.closePartnerPopup());
         });
      }


  }
  
  // 2023.04.19 상단 UI 변경 스크립트 추가
//  setTimeout(function() {
//			walletInteraction();
//		},800);
		
	function walletInteraction(){
		$(".call_bot_btn").addClass("is-load");

		setTimeout(function(){ 
			$(".call_bot_btn").addClass("is-top"); 
		},3700);
	}
		
		
  // IS_TEST 로컬 테스트 모드 설정
  const IS_TEST = false;
  
  // 챗봇 wrap 실행 시작
  async function run() {

    // remove forcing splash
    setTimeout(() => {
      const splash = $("#__splash");
      if (splash.length > 0) {
        Debug.log("splash forced remove");
        hideSplash();
      }
    }, _config.delayLimitToSplashForcingRemove || 15000);

    safeRun(
      () => HanaPartner.hideLoading(),
      () => {
        IS_TEST && forTest();
      }
    );

    if (await isExistChatbotInstance()) {
       forceClose();
       return;
    }

    Debug.init(_config);
    Debug.log("config: ", _config);

    experiment();
    connectChatbot();
  }

  initHandler();
  run();
})();
