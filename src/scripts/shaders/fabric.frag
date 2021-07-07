#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D backbuffer;

void main() {
    vec2 st = (2.*gl_FragCoord.xy-u_resolution)/min(u_resolution.x,u_resolution.y)*1.1;
    vec2 coord = st;
    
    float len;
    
    for (int i = 0; i < 3; i++) {
        len = length(vec2(coord.x, coord.y));
        
        coord.x +=  sin(coord.y + u_time * 0.3)*1.;
        coord.y +=  cos(coord.x + u_time * 0.1 + cos(len * 1.0))*6.;
    }
         
    vec3 color = vec3(0.);

    color = mix(color, vec3(cos(len)), 1.0);
    
    gl_FragColor = vec4(0.7*color,1.);
        
    //vec4 c = vec4(9.*color,1.);
    
    //float alpha = 0.07;
    
    //gl_FragColor = c*alpha + texture2D( backbuffer, st )*(1.0-alpha);
}
