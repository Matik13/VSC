// Globalne zmienne dla edytorów CodeMirror
let inputEditor, outputEditor

// Inicjalizacja CodeMirror po załadowaniu strony
document.addEventListener('DOMContentLoaded', function () {
	inputEditor = CodeMirror(document.getElementById('inputCode'), {
		value: '',
		mode: 'python',
		theme: 'dracula',
		lineNumbers: true,
		matchBrackets: true,
		lineWrapping: true,
	})

	outputEditor = CodeMirror(document.getElementById('outputCode'), {
		value: '',
		mode: 'python',
		theme: 'dracula',
		lineNumbers: true,
		matchBrackets: true,
		lineWrapping: true,
		// readOnly: true,
	})

	updateEffects()
	updateCompilerButton()
})

// Lista efektów
const effectsByLanguage = {
	Python: [
		{ id: 'sum_ones', label: 'Zamiana liczb na sume jedynek' },
		{ id: 'useless_comments', label: 'Dodanie komentarzy' },
		{ id: 'useless_if', label: 'Dodanie bezużytecznego if`a' },
		{ id: 'redundant_parentheses', label: 'Dodanie zbędnych nawiasów' },
		{ id: 'add_default_variables', label: 'Dodanie domyślnych zmiennych' },
	],
	Java: [
		{ id: 'compact', label: 'Wszystko w jednej linijce' },
		{ id: 'sum_ones', label: 'Zamiana liczb na sume jedynek' },
		{ id: 'useless_comments', label: 'Dodanie komentarzy' },
		{ id: 'redundant_parentheses', label: 'Dodanie zbędnych nawiasów' },
		{ id: 'add_default_variables', label: 'Dodanie domyślnych zmiennych' },
	],
	JavaScript: [
		{ id: 'compact', label: 'Wszystko w jednej linijce' },
		{ id: 'semicolons', label: 'Dodanie średników' },
		{ id: 'sum_ones', label: 'Zamiana liczb na sume jedynek' },
		{ id: 'useless_comments', label: 'Dodanie komentarzy' },
		{ id: 'useless_if', label: 'Dodanie bezużytecznego if`a' },
		{ id: 'redundant_parentheses', label: 'Dodanie zbędnych nawiasów' },
		{ id: 'add_default_variables', label: 'Dodanie domyślnych zmiennych' },
	],
	PHP: [
		{ id: 'compact', label: 'Wszystko w jednej linijce' },
		{ id: 'sum_ones', label: 'Zamiana liczb na sume jedynek' },
		{ id: 'useless_comments', label: 'Dodanie komentarzy' },
		{ id: 'useless_if', label: 'Dodanie bezużytecznego if`a' },
		{ id: 'redundant_parentheses', label: 'Dodanie zbędnych nawiasów' },
		{ id: 'add_default_variables', label: 'Dodanie domyślnych zmiennych' },
	],
	HTML: [
		{ id: 'useless_comments', label: 'Dodanie komentarzy' },
		{ id: 'random_whitespace', label: 'Losowe rozmieszczenie spacji' },
		{ id: 'format_caps', label: 'Znaczniki Capsem' },
		{ id: 'add_default_variables', label: 'Dodanie domyślnych zmiennych' },
	],
	CSS: [
		{ id: 'useless_comments', label: 'Dodanie komentarzy' },
		{ id: 'random_whitespace', label: 'Losowe rozmieszczenie spacji' },
		{ id: 'add_default_variables', label: 'Dodanie domyślnych zmiennych' },
	],
}

// Aktualizacja listy efektów dla wybranego języka
function updateEffects() {
	const language = document.getElementById('language').value
	const effectsContainer = document.getElementById('effectsContainer')
	effectsContainer.innerHTML = ''

	effectsByLanguage[language].forEach(effect => {
		const effectDiv = document.createElement('div')
		effectDiv.classList.add('effect')

		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.id = effect.id
		checkbox.value = effect.id

		const textDiv = document.createElement('div')
		textDiv.textContent = effect.label

		effectDiv.appendChild(checkbox)
		effectDiv.appendChild(textDiv)
		effectsContainer.appendChild(effectDiv)
	})
}

// Funkcja do konwersji kodu na podstawie zaznaczonych efektów
function convertCode() {
	const language = document.getElementById('language').value
	const effects = Array.from(document.querySelectorAll('#effectsContainer input[type=checkbox]:checked')).map(
		checkbox => checkbox.value
	)

	let code = inputEditor.getValue()
	let convertedCode = code

	if (effects.includes('useless_if') && ['Python', 'JavaScript', 'PHP'].includes(language)) {
		convertedCode = wrapInUselessIf(convertedCode, language)
	}
	if (effects.includes('semicolons')) {
		convertedCode = addSemicolons(convertedCode, language)
	}
	if (effects.includes('sum_ones')) {
		convertedCode = sumOnes(convertedCode)
	}
	if (effects.includes('useless_comments')) {
		convertedCode = addUselessComments(convertedCode, language)
	}
	if (effects.includes('random_whitespace')) {
		convertedCode = randomWhitespace(convertedCode)
	}
	if (effects.includes('redundant_parentheses')) {
		convertedCode = redundantParentheses(convertedCode)
	}
	if (effects.includes('format_caps')) {
		convertedCode = formatCaps(convertedCode, language)
	}
	if (effects.includes('add_default_variables')) {
		convertedCode = addDefaultVariables(convertedCode, language)
	}
	if (effects.includes('compact')) {
		convertedCode = compactCode(convertedCode)
	}

	outputEditor.setValue(convertedCode)
}

function addSemicolons(code, language) {
	// Dodaje średnik na końcu każdej niepustej linii, jeśli go tam nie ma
	return code
		.split('\n')
		.map(line => {
			if (line.trim() !== '' && !line.trim().endsWith(';')) {
				return line + ';'
			}
			return line
		})
		.join('\n')
}

function compactCode(code) {
	// Usuń komentarze jednoliniowe i spacje/entery, łącząc kod w jedną linijkę
	return code.replace(/\/\/.*$/gm, '').replace(/\s+/g, ' ')
}

function sumOnes(code) {
	// Zamienia liczby większe niż 1 na sumę jedynek w nawiasach
	return code.replace(/\b(\d+)\b/g, match => {
		const num = parseInt(match)
		return num > 1 ? `(${Array(num).fill('1').join('+')})` : match
	})
}

function addUselessComments(code, language) {
	let commentSyntax
	switch (language) {
		case 'Python':
			commentSyntax = '# Komentarz'
			break
		case 'JavaScript':
		case 'Java':
		case 'PHP':
			commentSyntax = '// Komentarz'
			break
		case 'HTML':
			commentSyntax = '<!-- Komentarz -->'
			break
		case 'CSS':
			commentSyntax = '/* Komentarz */'
			break
		default:
			return code
	}

	// Jeśli to PHP, nie dodawaj komentarzy po `?>`
	if (language === 'PHP' && code.includes('?>')) {
		let [beforePhpEnd, afterPhpEnd] = code.split('?>', 2) // Podziel kod na część przed i po `?>`
		beforePhpEnd = beforePhpEnd
			.split('\n')
			.map(line => (line.trim() ? line + ' ' + commentSyntax : line))
			.join('\n')
		return beforePhpEnd + '\n?>' + afterPhpEnd
	}

	// Standardowe dodawanie komentarzy
	return code
		.split('\n')
		.map(line => (line.trim() ? line + ' ' + commentSyntax : line))
		.join('\n')
}

function wrapInUselessIf(code, language) {
	let ifWrapper
	switch (language) {
		case 'Python':
			ifWrapper = `if not False:\n    `
			return ifWrapper + code.replace(/^/gm, '    ')
		case 'JavaScript':
			ifWrapper = `if (!false) {\n`
			return ifWrapper + code.replace(/^/gm, '    ') + `\n}`
		case 'PHP':
			const phpTag = '<?php'
			const index = code.indexOf(phpTag)
			if (index !== -1) {
				const before = code.substring(0, index + phpTag.length)
				const after = code.substring(index + phpTag.length)
				const closeIndex = after.indexOf('?>')
				if (closeIndex !== -1) {
					const inner = after.substring(0, closeIndex)
					const rest = after.substring(closeIndex)
					return before + ' if (!false) {' + inner.replace(/^/gm, '    ') + '\n}' + rest
				} else {
					return before + ' if (!false) {' + after.replace(/^/gm, '    ') + '\n}'
				}
			} else {
				ifWrapper = `if (!false) {\n`
				return ifWrapper + code.replace(/^/gm, '    ') + `\n}`
			}
	}
	return code
}

function randomWhitespace(code) {
	// Dla każdej spacji losowo dodaj dodatkową spację lub enter
	return code
		.split('')
		.map(char => {
			if (char === ' ' && Math.random() < 0.3) {
				return char + (Math.random() < 0.5 ? ' ' : '\n')
			}
			return char
		})
		.join('')
}

function redundantParentheses(code) {
	return code.replace(/(\b\w+\b)\s*([\+\-\*\/])\s*(\b\w+\b)/g, '($1) $2 ($3)')
}

function formatCaps(code, language) {
	if (language === 'HTML') {
		return code.replace(/<\s*\/?\s*([a-z0-9]+)/gi, function (match, p1) {
			return match.replace(p1, p1.toUpperCase())
		})
	}
	return code
}
// Funkcja dodająca domyślne zmienne
function addDefaultVariables(code, language) {
	let defaults = ''
	switch (language) {
		case 'Python':
			defaults =
				[
					'defaultFalse = False',
					'defaultTrue = True',
					'defaultEmptyString = ""',
					'invertedTrue = False',
					'invertedFalse = True',
					'zero = 0',
					'one = 1',
					'snakes = None',
					'emptyList = []',
					'emptyDict = {}',
				].join('\n') + '\n\n'
			return defaults + code

		case 'JavaScript':
			defaults =
				[
					'const defaultFalse = false;',
					'const defaultTrue = true;',
					'const defaultEmptyString = "";',
					'const invertedTrue = false;',
					'const invertedFalse = true;',
					'const zero = 0;',
					'const one = 1;',
					'const nullVar = null;',
					'const emptyArray = [];',
					'const emptyObject = {};',
				].join('\n') + '\n\n'
			return defaults + code

		case 'Java':
			defaults =
				[
					'boolean defaultFalse = false;',
					'boolean defaultTrue = true;',
					'String defaultEmptyString = "";',
					'boolean invertedTrue = false;',
					'boolean invertedFalse = true;',
					'int zero = 0;',
					'int one = 1;',
					'Object nullVar = null;',
					'Object emptyObject = null;',
				].join('\n') + '\n\n'

			let classIndex = code.indexOf('public class')
			if (classIndex !== -1) {
				let braceIndex = code.indexOf('{', classIndex)
				if (braceIndex !== -1) {
					return code.substring(0, braceIndex + 1) + '\n' + defaults + '\n' + code.substring(braceIndex + 1)
				}
			}
			return defaults + code

		case 'PHP':
			defaults =
				[
					'$defaultFalse = false;',
					'$defaultTrue = true;',
					'$defaultEmptyString = "";',
					'$invertedTrue = false;',
					'$invertedFalse = true;',
					'$zero = 0;',
					'$one = 1;',
					'$nullVar = null;',
					'$emptyArray = array();',
				].join('\n') + '\n\n'

			if (code.trim().startsWith('<?php')) {
				const phpTag = '<?php'
				const pos = code.indexOf(phpTag) + phpTag.length
				return code.substring(0, pos) + '\n' + defaults + '\n' + code.substring(pos)
			} else {
				return '<?php\n' + defaults + '\n' + code
			}

		case 'HTML':
			defaults =
				[
					'<!-- Domyślne zmienne -->',
					'<!-- defaultFalse = false -->',
					'<!-- defaultTrue = true -->',
					'<!-- defaultEmptyString = "" -->',
					'<!-- invertedTrue = false -->',
					'<!-- invertedFalse = true -->',
					'<!-- zero = 0 -->',
					'<!-- one = 1 -->',
					'<!-- yourSkill = none -->',
					'<!-- emptyArray = [] -->',
				].join('\n') + '\n\n'
			return defaults + code

		case 'CSS':
			defaults =
				[
					':root {',
					'  --default-false: false;',
					'  --default-true: true;',
					'  --default-empty-string: "";',
					'  --inverted-true: false;',
					'  --inverted-false: true;',
					'  --zero: 0;',
					'  --one: 1;',
					'  --unused-var: none;',
					'  --zero-color: #000000;',
					'  --nice-spacing: 10px;',
					'}',
				].join('\n') + '\n\n'
			return defaults + code

		default:
			return code
	}
}

// Obsługa otwierania pliku
function openFile() {
	const fileInput = document.createElement('input')
	fileInput.type = 'file'
	fileInput.accept = '.py,.java,.js,.php,.html,.css,.txt'
	fileInput.onchange = event => {
		const file = event.target.files[0]
		const extension = file.name.split('.').pop()
		const language = getLanguageFromExtension(extension)
		document.getElementById('language').value = language
		updateLanguageMode()
		updateCompilerButton()
		const reader = new FileReader()
		reader.onload = e => {
			inputEditor.setValue(e.target.result)
		}
		reader.readAsText(file)
	}
	fileInput.click()
}

function getLanguageFromExtension(extension) {
	switch (extension) {
		case 'py':
			return 'Python'
		case 'java':
			return 'Java'
		case 'js':
			return 'JavaScript'
		case 'php':
			return 'PHP'
		case 'html':
			return 'HTML'
		case 'css':
			return 'CSS'
		default:
			return 'Python'
	}
}

function getFileExtension(language) {
	switch (language) {
		case 'Python':
			return 'py'
		case 'Java':
			return 'java'
		case 'JavaScript':
			return 'js'
		case 'PHP':
			return 'php'
		case 'HTML':
			return 'html'
		case 'CSS':
			return 'css'
		default:
			return 'txt'
	}
}

async function loadExampleCode() {
	const language = document.getElementById('language').value
	const extension = getFileExtension(language)
	try {
		const response = await fetch(`example_codes/example.${extension}`)
		if (!response.ok) throw new Error('Nie znaleziono pliku przykładowego.')
		const code = await response.text()
		inputEditor.setValue(code)
	} catch (error) {
		alert('Nie udało się załadować przykładowego kodu: ' + error.message)
	}
}

function downloadCode() {
	const language = document.getElementById('language').value
	const extension = getFileExtension(language)
	const code = outputEditor.getValue()
	const blob = new Blob([code], { type: 'text/plain' })
	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = `converted_code.${extension}`
	link.click()
}

function copyToClipboard() {
	const code = outputEditor.getValue()
	navigator.clipboard.writeText(code).then(() => {
		alert('Kod został skopiowany do schowka.')
	})
}

// Zmiana trybu CodeMirror na podstawie wybranego języka
function updateLanguageMode() {
	const lang = document.getElementById('language').value
	let mode = 'python'

	switch (lang) {
		case 'JavaScript':
			mode = 'javascript'
			break
		case 'Java':
			mode = 'text/x-java'
			break
		case 'PHP':
			mode = 'application/x-httpd-php'
			break
		case 'HTML':
			mode = 'xml'
			break
		case 'CSS':
			mode = 'css'
			break
	}

	inputEditor.setOption('mode', mode)
	outputEditor.setOption('mode', mode)
}

// Linki do kompilatorów
function openCompiler() {
	const language = document.getElementById('language').value
	let url = ''
	switch (language) {
		case 'Python':
			url = 'https://www.programiz.com/python-programming/online-compiler/'
			break
		case 'Java':
			url = 'https://www.programiz.com/java-programming/online-compiler/'
			break
		case 'JavaScript':
			url = 'https://www.programiz.com/javascript/online-compiler/'
			break
		case 'PHP':
			url = 'https://www.programiz.com/php/online-compiler/'
			break
		case 'HTML':
			url = 'https://onecompiler.com/html'
			break
		case 'CSS':
			url = 'https://www.programiz.com/html/online-compiler/'
			break
	}
	window.open(url, '_blank')
}

// Przycisk "Kompilator online (język)"
function updateCompilerButton() {
	const language = document.getElementById('language').value
	const button = document.getElementById('compilerButton')
	button.textContent = `Kompilator online (${language})`
}
