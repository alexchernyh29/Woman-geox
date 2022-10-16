class Test {
	constructor(data) {
		this.data = data;
		this.questions = data.questions;
		this.results = data.results;
		this.Index_1 = 0;
        this.Index_2 = 7;
		this.answers = ["Б", "А", "Б", "А", "Б", "Б", "А"];
        this.count = 0;
		this.activeIndex = 0;

		this.$testContainer = $(".test");
		this.$questionCounter = $(".test__counter span");
		this.$answerItem = $(".test__item");
		this.$answer__1 = $(".test__text__1");
		this.$answer__2 = $(".test__text__2");
		this.$questionWomanImage_1 = $(".test__coffee");
		this.$questionWomanImage_2 = $(".test__tea");

		this.$resultFrameAnswer = $(".result__answer");
		this.$resultFrameText = $(".result__text");
		this.$resultFrameRecommendation = $(".result__recommendation");
	}

	init() {
		this.handleEvents();
		this.renderQuestion();
	}

	handleEvents() {
		this.$answerItem.on("click", (e) => {
			const id = $(e.target).closest(".test__item").data("id");
			this.answers[id] += 1;
			this.activeIndex += 1;
			if (this.activeIndex >= this.questions.length) {
				this.renderResults();
			} else {
				this.renderQuestion();
			}
			function check(id, answer) {
				if(answers[id] === answer) {
					count++;
				}
			}
		});
		$(".result__btn").on("click", () => {
			fullpage_api.setMouseWheelScrolling(true);
			fullpage_api.setAllowScrolling(true);
			setTimeout(() => {
				$("body").removeClass("show-result");
			}, 700);
			this.activeIndex = 0;
			this.answers = {
				А: 0,
				Б: 0,
			};
			this.renderQuestion();
		});
	}

	getTestClass() {
		if (this.activeIndex >= 7) {
			return "test_images";
		}
		if (this.activeIndex % 2) {
			return "test_right";
		} else {
			return "test_left";
		}
	}

	renderQuestion() {
		const currentQuestion = this.questions[this.activeIndex];
		const { title, answers } = currentQuestion;
		this.$testContainer.removeClass("test_left test_right test_images");
		this.$testContainer.addClass(this.getTestClass());
		this.$questionCounter.text(this.activeIndex + 1);
		this.$questionTitle.html(title);
		this.$questionWomanImage_1.html(
			`<img src="/images/test-woman-${this.Index_1 + 1}.jpg" />`
		);
		this.$questionWomanImage_2.html(
			`<img src="/images/test-woman-${this.Index_2 + 1}.jpg" />`
		);
		this.$answerItem.each((id, item) => {
			if (this.activeIndex < this.questions.length - 1) {
				$(item).find(".test__answer-text").html(answers[id].text);
			} else {
				$(item)
					.find(".test__answer-text")
					.html(`<img src="/images/${answers[id].text}" />`);
			}
		});
	}

	getWinner() {
		let count = 0;
		let winner = "";
		for (let key in this.answers) {
			if (this.answers[key] > count) {
				count = this.answers[key];
				winner = key;
			}
		}
		return winner;
	}

	getWinnerIndex(winner) {
		let index = 0;
		this.results.forEach((item, i) => {
			if (item.id === winner) {
				index = i;
			}
		});
		return index + 1;
	}

	renderResults() {
		const winner = this.getWinner();
		$("body").addClass("show-result");
		$("html, body").animate(
			{
				scrollTop: $(".result").offset().top,
			},
			500
		);
		const idx = this.getWinnerIndex(winner);
		const currentResult = this.results.find((item) => item.id === winner);
		const { answer, text, recommendation } = currentResult;
		this.$resultFrameTitle.html(answer);
		this.$resultFrameText.html(text);
		this.$resultFrameInfo.html(recommendation);
		fullpage_api.setMouseWheelScrolling(false);
		fullpage_api.setAllowScrolling(false);
	}
}

export default Test;
