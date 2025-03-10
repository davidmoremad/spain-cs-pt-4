Evasión de filtros en User-Agent
================================


# Unicode encoding

Unicode es un estándar de codificación de caracteres diseñado para facilitar el tratamiento informático, transmisión y visualización de textos de numerosos idiomas y disciplinas técnicas, además de textos clásicos de lenguas muertas. El término Unicode proviene de los tres objetivos perseguidos: universalidad, uniformidad, y unicidad.

Unicode define cada carácter o símbolo mediante un nombre e identificador numérico, el punto de código (code point). Además incluye otras informaciones para el uso correcto de cada carácter, como sistema de escritura, categoría, direccionalidad, mayúsculas y otros atributos. Unicode trata los caracteres alfabéticos, ideográficos y símbolos de forma equivalente, lo que significa que se pueden mezclar en un mismo texto sin utilizar marcas o caracteres de control.

Puedes usar esta herramienta online para codificar y decodificar texto en Unicode:
[https://checkserp.com/encode/unicode/](https://checkserp.com/encode/unicode/)

# WAF Bypass

Algunos firewalls bloquean peticiones de bots o herramientas como curl, pero podríamos usar Unicode para evadirlos.
Si un WAF bloquea curl en el User-Agent, podemos probar con caracteres Unicode invisibles o similares:

⚠️ **Nota:** Algunos servidores web como Apache o Nginx no permiten caracteres Unicode en el User-Agent, 
por lo que esta técnica podría no funcionar en todos los casos.


#### ❌ Bloqueado
```
User-Agent: curl/7.64.1
```

#### ✅ Evasión con Unicode homoglyph (U+0441: letra "с" cirílica en vez de latina)
```
User-Agent: сurl/7.64.1
```

---

# Probando en local

Instalamos dependencias y levantamos un servidor local con Node.js:

```bash
npm install express
node server.js
```


#### ❌ Prueba 1 - Petición legítima 

Lanzamos una primera petición con curl:

```bash
curl -sS http://localhost:3000
```

Al no usar User-Agent, o incluso si usamos un User-Agent legítimo, la respuesta será rechazada por el servidor:
```
Denied: User-Agent 'curl' is blocked.
```


#### ✅ Prueba 2 - Evasión con Unicode

Lanzamos una segunda petición con curl, pero esta vez con un User-Agent que esconde un caracter Unicode:
```bash
curl -sS -A "сurl/7.64.1" http://localhost:3000
```

Respuesta:
```
Everything is fine!
```
