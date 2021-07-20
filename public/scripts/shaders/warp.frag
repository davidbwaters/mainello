precision highp float;

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex;


float random (in vec2 st) {
   	highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(st.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float noise(vec2 st) {
    vec2 i = vec2(0.);
		i = floor(st);
    vec2 f = vec2(0.);
		f = fract(st);
    vec2 u =  vec2(0.);
		u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}


float grid(vec2 uv){
    vec2 guv = fract(uv * 10.0);
    float line = guv.x > 0.4 && guv.x < 0.6  || guv.y > 0.45 && guv.y < 0.55 ? 1.0 : 0.0;
    return line;
}

float remap(float i, float cMin, float cMax, float nMin, float nMax, bool clamp){
    float ni = nMin + (cMax - i) * (nMax - nMin) / (cMax - cMin);
    ni = clamp == true ? max(min(nMax, ni), nMin) : ni;
    return ni;
}

vec2 bend(vec2 uv){
    float ny = remap(uv.y, 1.0, 0.0, -0.1 + 0.2*sin(u_time), 1.0, false);
    ny = clamp(ny, 0.0, 1.0);
    float bendRatio = pow(ny, 2.5);
    float nx = pow((gl_FragCoord.x*2.0 - u_resolution.x)/u_resolution.x, 2.0);
    bendRatio *=  (1.0-nx);
    float bendX = 0.16*sin(uv.y*PI*3.0 + u_time)* (bendRatio *(1.0+ random(uv + u_time)*0.02*bendRatio));
    float bendY = random(uv + u_time)*0.005*bendRatio;
    vec2 bendUv =vec2(uv.x + bendX, uv.y + bendY);
    return bendUv;
}


void main() {
   vec2 pos = gl_FragCoord.xy/u_resolution.xy;
		pos.y = 1.0 - pos.y;
    //noise
    float n = random(pos);
    n *= max(pos.y -0.3, 0.0);
		n = 1.0 - n;
		n = smoothstep(0.4, 1.0, n);

    pos = bend(pos);
		vec3 col = vec3(texture2D(u_tex, pos).x , texture2D(u_tex, pos+vec2(pos.y / u_resolution.y * 1. ,0.0)).yz);
		//col *= n;

    gl_FragColor = vec4(vec3(col), 1.0);
}
