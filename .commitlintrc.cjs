// 这里是通俗的解释 详情请前往官方文档查阅
module.exports = {
	ignores: [(commit) => commit.includes("init")],
	extends: ["@commitlint/config-conventional"],
	rules: {
		"body-leading-blank": [2, "always"], // 信息以空格开头
		"footer-leading-blank": [2, "always"],
		"header-max-length": [2, "always", 108],// 信息最大长度
		"subject-empty": [2, "never"],// 信息不能未空
		"type-empty": [2, "never"],// 信息类型不能未空
		// 提交信息的类型 下文有介绍
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"perf",
				"style",
				"docs",
				"test",
				"refactor",
				"build",
				"ci",
				"chore",
				"revert",
				"wip",
				"workflow",
				"types",
				"release",
				"temp",
			],
		],
	},
};
