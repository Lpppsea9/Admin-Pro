module.exports = {
	// 使 eslint 支持 node 与 ES6
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	// 引入推荐的语法校验规则
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended", // 在最后面新增extends, eslint 与 prettier 冲突的校验规则会被 prettier 覆盖掉
	],
	overrides: [],
	/* 
   这里一定要配置对 先使用vue-eslint-parser 再使用@typescript-eslint/parser
   先解析 <template> 标签中的内容 然后再解析 vue <script> 标签中的 TS 代码
   */
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		sourceType: "module",
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {},
};
