import $ from "jquery";
import DATA from "./data";

let rightAnswers = 0;
let activeIndex = 0;
let isTestReady = false;

const { questions, results } = DATA;

$(() => {
	var isMobile =
		$(window).width() < 1201 && $(window).height() > $(window).width();
	var orientation = "";

	$("body").on("mousewheel DOMMouseScroll", function (e) {
		if (
			typeof e.originalEvent.detail == "number" &&
			e.originalEvent.detail !== 0
		) {
			if (e.originalEvent.detail > 0) {
				if (
					!$("body").hasClass("show-result") &&
					!$("body").hasClass("show-test")
				) {
					isTestReady = true;
					$("body").addClass("show-test");
					checkDevice();
				}
				if ($("body").hasClass("show-result")) {
					$([document.documentElement, document.body]).animate(
						{
							scrollTop: $(".promo").offset().top,
						},
						200
					);
				}
				console.log("Down1");
			} else if (e.originalEvent.detail < 0) {
				if ($("body").hasClass("show-result")) {
					$([document.documentElement, document.body]).animate(
						{
							scrollTop: $(".result").offset().top,
						},
						200
					);
				}
				console.log("Up");
			}
		} else if (typeof e.originalEvent.wheelDelta == "number") {
			if (e.originalEvent.wheelDelta < 0) {
				if (
					!$("body").hasClass("show-result") &&
					!$("body").hasClass("show-test")
				) {
					isTestReady = true;
					$("body").addClass("show-test");
					checkDevice();
				}
				if ($("body").hasClass("show-result")) {
					$([document.documentElement, document.body]).animate(
						{
							scrollTop: $(".promo").offset().top,
						},
						200
					);
				}
				console.log("Down2");
			} else if (e.originalEvent.wheelDelta > 0) {
				if ($("body").hasClass("show-result")) {
					$([document.documentElement, document.body]).animate(
						{
							scrollTop: $(".result").offset().top,
						},
						200
					);
				}
				console.log("Up");
			}
		}
	});

	$(window).on("load resize", detectDevice);
	function detectDevice() {
		isMobile =
			$(window).width() < 1201 && $(window).height() > $(window).width();
		console.log("$(window).height()", $(window).height());
		console.log("$(window).width()", $(window).width());
		console.log("isMobile", isMobile);
		let detectObj = {
			device: /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
				navigator.userAgent
			)
				? "mobile"
				: "computer",
			orientation: !navigator.maxTouchPoints
				? "desktop"
				: !window.screen.orientation.angle
				? "portrait"
				: "landscape",
		};

		orientation = detectObj.orientation;
		device = detectObj.device;
		checkDevice();
		return detectObj;
	}
	function getResultId() {
		if (rightAnswers < 4) {
			return 0;
		} else if (rightAnswers >= 4 && rightAnswers < 6) {
			return 1;
		} else if (rightAnswers >= 6) {
			return 2;
		}
	}

	function checkDevice() {
		if (isTestReady) {
			if (orientation === "portrait" && isMobile) {
				$(".overlay").addClass("is-active");
			} else {
				$(".overlay").removeClass("is-active");
				if (!$("body").hasClass("show-result")) {
					showQuestion();
				}
			}
		}
	}

	function showQuestion() {
		$(".test").attr("data-id", activeIndex);
		$($(".test__item")[0]).attr("data-id", 0);
		$($(".test__item")[0])
			.find(".test__text")
			.html(questions[activeIndex].answers[0].text);
		$($(".test__item")[1]).attr("data-id", 1);
		$($(".test__item")[1])
			.find(".test__text")
			.html(questions[activeIndex].answers[1].text);
		$(".test__counter span").html(activeIndex + 1);
		$(".popup__text").html(questions[activeIndex].text);

		$($(".test__item")[0])
			.find(".test__foto")
			.attr("src", questions[activeIndex].imageLeft);
		$($(".test__item")[1])
			.find(".test__foto")
			.attr("src", questions[activeIndex].imageRight);
	}

	function showResult() {
		const resultId = getResultId();
		const currentResults = results[resultId];
		$("body").addClass("show-result").removeClass("show-test");
		$(".result__answer").html(currentResults.answer);
		$(".result__text").html(currentResults.text);
		$(".result__recommendation span").html(currentResults.recommendation);
	}

	$(".index__button").on("click", function (e) {
		isTestReady = true;
		$("body").addClass("show-test");
		checkDevice();
	});

	$(".result__restart").on("click", function () {
		activeIndex = 0;
		rightAnswers = 0;
		$("body").addClass("show-test").removeClass("show-result");
		checkDevice();
	});

	$(".test").on("click", ".test__item", function (e) {
		$(".popup").addClass("is-active");
		const id = $(e.target).closest(".test__item").data("id");
		const isRightAnswer = questions[activeIndex].answers[id].isRightAnswer;
		if (isRightAnswer) {
			rightAnswers += 1;
			$(".popup__chapter span").hide();
		} else {
			$(".popup__chapter span").show();
		}
	});

	$(".popup__cross, .popup__button").on("click", function (e) {
		$(".popup").removeClass("is-active");
		activeIndex = activeIndex + 1;
		if (activeIndex >= questions.length) {
			showResult();
		} else {
			showQuestion();
		}
	});
});
