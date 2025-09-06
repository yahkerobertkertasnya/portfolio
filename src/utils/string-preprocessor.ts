export default function stringPreprocessor(text: string) {
  text = text
    .replace(/\[([^\]]+)\]/g, "<span class='text-[#00ADB5] font-medium hover:text-[#088395] transition-colors'>$1</span>")
    .replace(/\{([^}]+)\}/g, "<span class='font-bold'>$1</span>")
    .replaceAll("\n", "<br>");

  if (text.startsWith(":")) {
    return "<ul class='space-y-4'>";
  }

  if (text.startsWith("-")) {
    return `
      <li class="flex items-start gap-3 text-base text-white/90 max-lg:text-sm">
        <span class="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#00ADB5]"></span>
        <span class="flex-1">${text.slice(1).trim()}</span>
      </li>
    `;
  }

  if (text.startsWith(";")) {
    return "</ul>";
  }

  return `<p class="text-base text-white/90 max-lg:text-sm">${text}</p>`;
}
