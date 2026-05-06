"use client";
import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; size: number };

export function ResumeAnalyzerCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    let scanY = 0, score = 0, particles: P[] = [];
    const lines = Array.from({ length: 11 }, () => ({ w: 0.3 + Math.random() * 0.55, a: 0 }));
    const bars = [
      { label: "Experience", v: 0.82, color: "#ff7b54" },
      { label: "Skills", v: 0.67, color: "#ffb380" },
      { label: "Education", v: 0.91, color: "#ff9a6c" },
      { label: "Keywords", v: 0.54, color: "#ffd4bc" },
    ];
    const draw = () => {
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#060610"; ctx.fillRect(0, 0, W, H);
      const docX = W * 0.06, docY = H * 0.08, docW = W * 0.50, docH = H * 0.84;
      const panelX = docX + docW + W * 0.05, panelW = W - panelX - W * 0.04;
      if (scanY === 0) scanY = docY;
      if (scanY > docY + docH + 20) { scanY = docY; score = 0; particles = []; lines.forEach(l => l.a = 0); }
      const progress = Math.max(0, (scanY - docY) / docH);
      // doc bg
      ctx.save(); ctx.shadowColor = "rgba(255,100,60,0.15)"; ctx.shadowBlur = 20;
      ctx.fillStyle = "rgba(14,12,26,0.97)";
      ctx.beginPath(); ctx.roundRect(docX, docY, docW, docH, 8); ctx.fill(); ctx.restore();
      ctx.strokeStyle = `rgba(255,100,60,${0.1 + progress * 0.25})`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(docX, docY, docW, docH, 8); ctx.stroke();
      ctx.fillStyle = "rgba(255,100,60,0.12)"; ctx.fillRect(docX, docY, docW, 22);
      ctx.fillStyle = "rgba(255,100,60,0.5)"; ctx.beginPath(); ctx.roundRect(docX+8, docY+7, 56, 8, 2); ctx.fill();
      // lines
      const ls = docY + 30, lsp = (docH - 34) / 11;
      lines.forEach((line, i) => {
        const ly = ls + i * lsp;
        if (scanY > ly) line.a = Math.min(1, line.a + 0.06);
        if (line.a <= 0) return;
        const isAct = Math.abs(scanY - ly) < 18;
        if (isAct) { ctx.fillStyle = "rgba(255,100,60,0.08)"; ctx.fillRect(docX+4, ly-4, docW-8, 12); }
        ctx.globalAlpha = line.a * 0.85;
        const lw = (docW - 24) * line.w;
        const lg = ctx.createLinearGradient(docX+12, 0, docX+12+lw, 0);
        lg.addColorStop(0, isAct ? "rgba(255,180,140,0.95)" : "rgba(180,170,170,0.6)");
        lg.addColorStop(1, "rgba(180,170,170,0.05)");
        ctx.fillStyle = lg; ctx.beginPath(); ctx.roundRect(docX+12, ly, lw, 4.5, 2); ctx.fill();
        ctx.globalAlpha = 1;
      });
      // scan line
      if (scanY >= docY && scanY <= docY + docH) {
        const sg = ctx.createLinearGradient(docX, scanY-28, docX, scanY+5);
        sg.addColorStop(0, "transparent"); sg.addColorStop(0.6, "rgba(255,100,60,0.15)"); sg.addColorStop(1, "rgba(255,140,80,0.5)");
        ctx.fillStyle = sg; ctx.fillRect(docX, scanY-28, docW, 33);
        ctx.save(); ctx.shadowColor = "rgba(255,120,60,1)"; ctx.shadowBlur = 10;
        ctx.strokeStyle = "rgba(255,200,160,0.95)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(docX, scanY); ctx.lineTo(docX+docW, scanY); ctx.stroke(); ctx.restore();
        if (Math.random() > 0.65) particles.push({ x: docX+Math.random()*docW, y: scanY, vx: (Math.random()-.5)*1.2, vy: -Math.random()*1.5, life: 1, size: Math.random()*2+1 });
        scanY += 1.3;
      } else scanY += 1.3;
      // panel
      if (panelW > 30) {
        score = Math.min(87, Math.floor(progress * 110));
        const cx2 = panelX + panelW/2, cy2 = H*0.22, r = Math.min(panelW, 48)*0.48;
        ctx.globalAlpha = Math.min(1, progress * 2.5);
        ctx.strokeStyle = "rgba(255,100,60,0.15)"; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(cx2, cy2, r, 0, Math.PI*2); ctx.stroke();
        ctx.save(); ctx.shadowColor = "rgba(255,100,60,0.7)"; ctx.shadowBlur = 10;
        ctx.strokeStyle = "#ff7b54"; ctx.lineWidth = 4; ctx.lineCap = "round";
        ctx.beginPath(); ctx.arc(cx2, cy2, r, -Math.PI/2, -Math.PI/2 + Math.PI*2*(score/100)); ctx.stroke(); ctx.restore();
        ctx.fillStyle = "#fff"; ctx.font = `bold ${Math.floor(r*0.65)}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(`${score}`, cx2, cy2);
        ctx.fillStyle = "rgba(255,100,60,0.7)"; ctx.font = `${Math.floor(r*0.28)}px sans-serif`; ctx.fillText("SCORE", cx2, cy2 + r*0.55);
        bars.forEach((bar, bi) => {
          const by = H*0.42 + bi*(H*0.135);
          const bp = Math.min(1, Math.max(0, (progress - bi*0.15)/0.5));
          ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.beginPath(); ctx.roundRect(panelX, by, panelW, 5, 2); ctx.fill();
          if (bp > 0) {
            ctx.save(); ctx.shadowColor = bar.color; ctx.shadowBlur = 5;
            const bg2 = ctx.createLinearGradient(panelX, 0, panelX+panelW*bar.v*bp, 0);
            bg2.addColorStop(0, bar.color); bg2.addColorStop(1, bar.color+"80");
            ctx.fillStyle = bg2; ctx.beginPath(); ctx.roundRect(panelX, by, panelW*bar.v*bp, 5, 2); ctx.fill(); ctx.restore();
          }
          ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.font = `${Math.max(8, Math.floor(panelW*0.17))}px sans-serif`; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic"; ctx.fillText(bar.label, panelX, by-4);
        });
        ctx.globalAlpha = 1;
      }
      // particles
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.life-=0.04; ctx.globalAlpha=p.life; ctx.fillStyle=`rgba(255,150,80,${p.life})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1; });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ width:"100%", height:"100%", display:"block" }} />;
}

export function SkillGapCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const W = c.width, H = c.height;
    // nodes
    const layers = [[0.12, [0.2,0.4,0.6,0.8]], [0.38, [0.13,0.28,0.43,0.58,0.73,0.88]], [0.65, [0.2,0.4,0.6,0.8]], [0.88, [0.35,0.65]]];
    const nodes: { x:number; y:number; gap:boolean; phase:number }[] = [];
    layers.forEach(([xr, ys]) => (ys as number[]).forEach(yr => nodes.push({ x:W*(xr as number), y:H*(yr as number), gap:Math.random()<0.35, phase:Math.random()*Math.PI*2 })));
    const edges: [number,number][] = [];
    for (let a=0;a<nodes.length;a++) for (let b=a+1;b<nodes.length;b++) {
      const la = layers.findIndex(l => Math.abs(nodes[a].x - W*(l[0] as number)) < 5);
      const lb = layers.findIndex(l => Math.abs(nodes[b].x - W*(l[0] as number)) < 5);
      if (lb - la === 1 && Math.random() > 0.45) edges.push([a,b]);
    }
    const pulses: { edge:number; t:number; speed:number }[] = [];
    let t = 0;
    const draw = (ts: number) => {
      t = ts * 0.001;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="#060614"; ctx.fillRect(0,0,W,H);
      const gr = ctx.createRadialGradient(W*0.5,H*0.5,0,W*0.5,H*0.5,W*0.7);
      gr.addColorStop(0,"rgba(100,80,220,0.05)"); gr.addColorStop(1,"transparent");
      ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
      if (Math.random()>0.93 && pulses.length<12) pulses.push({ edge:Math.floor(Math.random()*edges.length), t:0, speed:0.008+Math.random()*0.012 });
      // edges
      edges.forEach(([a,b]) => {
        const na=nodes[a], nb=nodes[b];
        ctx.strokeStyle="rgba(129,140,248,0.12)"; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(na.x,na.y); ctx.lineTo(nb.x,nb.y); ctx.stroke();
      });
      // pulses
      pulses.forEach((p,pi) => {
        p.t+=p.speed;
        if (p.t>1) { pulses.splice(pi,1); return; }
        const [a,b]=edges[p.edge]; const na=nodes[a], nb=nodes[b];
        const px=na.x+(nb.x-na.x)*p.t, py=na.y+(nb.y-na.y)*p.t;
        ctx.save(); ctx.shadowColor="rgba(129,140,248,0.9)"; ctx.shadowBlur=8;
        ctx.fillStyle="rgba(180,170,255,0.95)"; ctx.beginPath(); ctx.arc(px,py,2.5,0,Math.PI*2); ctx.fill(); ctx.restore();
      });
      // nodes
      nodes.forEach(n => {
        const pulse = Math.sin(t*2+n.phase)*0.3+0.7;
        const r = 6;
        if (!n.gap) {
          ctx.save(); ctx.shadowColor="rgba(129,140,248,0.8)"; ctx.shadowBlur=12*pulse;
          ctx.fillStyle=`rgba(${99+Math.floor(pulse*30)},102,241,${0.7+pulse*0.3})`; ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle="rgba(180,170,255,0.5)"; ctx.lineWidth=1.5; ctx.stroke(); ctx.restore();
        } else {
          ctx.save(); ctx.shadowColor="rgba(239,68,68,0.4)"; ctx.shadowBlur=6;
          ctx.fillStyle="rgba(80,30,50,0.9)"; ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle="rgba(239,68,68,0.5)"; ctx.lineWidth=1.5; ctx.stroke();
          ctx.strokeStyle="rgba(239,68,68,0.7)"; ctx.lineWidth=1.5;
          ctx.beginPath(); ctx.moveTo(n.x-3,n.y-3); ctx.lineTo(n.x+3,n.y+3); ctx.moveTo(n.x+3,n.y-3); ctx.lineTo(n.x-3,n.y+3); ctx.stroke(); ctx.restore();
        }
      });
      // legend
      ctx.fillStyle="rgba(129,140,248,0.6)"; ctx.font="10px sans-serif"; ctx.textAlign="left"; ctx.textBaseline="top";
      ctx.fillText("● Skill Acquired", 8, H-34);
      ctx.fillStyle="rgba(239,68,68,0.6)"; ctx.fillText("✕ Skill Gap", 8, H-18);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ width:"100%", height:"100%", display:"block" }} />;
}

export function InterviewAICanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const W = c.width, H = c.height;
    let t = 0, score = 0, turn = 0, turnTimer = 0;
    const bubbles: { x:number; y:number; w:number; left:boolean; lines:number; alpha:number }[] = [];
    const wavePhases = Array.from({length:24},()=>Math.random()*Math.PI*2);
    const draw = (ts: number) => {
      t = ts*0.001; turnTimer += 0.016;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="#060612"; ctx.fillRect(0,0,W,H);
      if (turnTimer > 2.8) { turnTimer=0; turn=1-turn; bubbles.length=0; }
      score = Math.min(92, score + 0.06);
      const lx=W*0.22, rx=W*0.78, ay=H*0.3, ar=Math.min(W,H)*0.1;
      // glow bg
      [lx,rx].forEach((x,i)=>{
        const gr=ctx.createRadialGradient(x,ay,0,x,ay,ar*3.5);
        gr.addColorStop(0,i===turn?"rgba(56,189,248,0.06)":"rgba(56,189,248,0.02)"); gr.addColorStop(1,"transparent");
        ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
      });
      // avatars
      [lx,rx].forEach((x,i)=>{
        const speaking=i===turn;
        const pulse=speaking?(Math.sin(t*4)*0.15+0.85):0.4;
        ctx.save(); ctx.shadowColor=speaking?"rgba(56,189,248,0.8)":"rgba(56,189,248,0.2)"; ctx.shadowBlur=speaking?20:5;
        const g=ctx.createRadialGradient(x-ar*0.3,ay-ar*0.3,0,x,ay,ar);
        g.addColorStop(0,speaking?"rgba(100,220,255,0.9)":"rgba(40,100,140,0.6)"); g.addColorStop(1,speaking?"rgba(20,100,180,0.8)":"rgba(10,40,80,0.5)");
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,ay,ar,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle=`rgba(56,189,248,${pulse})`; ctx.lineWidth=2; ctx.stroke();
        if (speaking) {
          ctx.strokeStyle=`rgba(56,189,248,${0.3*(1-((t*0.5)%1))})`;
          ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,ay,ar*(1+((t*0.5)%1)*0.6),0,Math.PI*2); ctx.stroke();
        }
        ctx.restore();
        ctx.fillStyle=speaking?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.4)";
        ctx.font=`${Math.floor(ar*0.55)}px sans-serif`; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText(i===0?"🤖":"🧑",x,ay);
        ctx.fillStyle="rgba(255,255,255,0.3)"; ctx.font=`${Math.floor(ar*0.28)}px sans-serif`;
        ctx.fillText(i===0?"AI Interviewer":"Candidate",x,ay+ar+14);
      });
      // bubble
      if (turnTimer < 0.3 && bubbles.length===0) {
        bubbles.push({ x:turn===0?lx+ar+10:rx-ar-10, y:ay-ar*0.5, w:W*0.25, left:turn===0, lines:3, alpha:0 });
      }
      bubbles.forEach(b => {
        b.alpha=Math.min(1,b.alpha+0.05);
        const bx=b.left?b.x:b.x-b.w, by=b.y, bw=b.w, bh=b.lines*14+20;
        ctx.save(); ctx.globalAlpha=b.alpha;
        ctx.fillStyle="rgba(20,30,60,0.9)"; ctx.strokeStyle="rgba(56,189,248,0.3)"; ctx.lineWidth=1;
        ctx.beginPath(); ctx.roundRect(bx,by,bw,bh,8); ctx.fill(); ctx.stroke();
        for(let li=0;li<b.lines;li++){
          const lineW=bw*(0.4+Math.random()*0.45);
          ctx.fillStyle="rgba(56,189,248,0.4)"; ctx.beginPath(); ctx.roundRect(bx+10,by+10+li*14,lineW,4,2); ctx.fill();
        }
        ctx.restore();
      });
      // waveform
      const wBase=H*0.72, wMid=H*0.78, wH2=H*0.06;
      const bars=24, bw2=(W-40)/bars;
      for(let i=0;i<bars;i++){
        const speaking=turn===0||(i>6&&i<18);
        const h=speaking?(Math.sin(t*6+wavePhases[i])*0.5+0.5)*wH2*2.2:wH2*0.2;
        const x=20+i*bw2+bw2*0.15, bw3=bw2*0.6;
        const gw=ctx.createLinearGradient(x,wMid-h,x,wMid+h);
        gw.addColorStop(0,"rgba(56,189,248,0.9)"); gw.addColorStop(1,"rgba(14,100,180,0.4)");
        ctx.fillStyle=gw; ctx.beginPath(); ctx.roundRect(x,wMid-h/2,bw3,h,2); ctx.fill();
      }
      // score
      ctx.save();
      ctx.shadowColor="rgba(56,189,248,0.5)"; ctx.shadowBlur=10;
      ctx.fillStyle="rgba(56,189,248,0.15)"; ctx.strokeStyle="rgba(56,189,248,0.4)"; ctx.lineWidth=1;
      ctx.beginPath(); ctx.roundRect(W-70,10,60,34,8); ctx.fill(); ctx.stroke(); ctx.restore();
      ctx.fillStyle="rgba(56,189,248,0.8)"; ctx.font="bold 11px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="top"; ctx.fillText("SCORE",W-40,14);
      ctx.fillStyle="#fff"; ctx.font="bold 14px sans-serif"; ctx.fillText(`${Math.floor(score)}%`,W-40,24);
      // label
      ctx.fillStyle="rgba(56,189,248,0.4)"; ctx.font="10px sans-serif"; ctx.textAlign="left"; ctx.textBaseline="top"; ctx.fillText("● Live Interview Simulation",8,8);
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return ()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={ref} style={{width:"100%",height:"100%",display:"block"}} />;
}

export function JobConnectorCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const c=ref.current; if(!c) return;
    const ctx=c.getContext("2d")!;
    let raf=0;
    c.width=c.offsetWidth; c.height=c.offsetHeight;
    const W=c.width, H=c.height;
    // dots
    const dots:{x:number;y:number;pulse:number;active:boolean}[]=[];
    for(let i=0;i<28;i++) dots.push({x:W*0.06+Math.random()*W*0.88,y:H*0.08+Math.random()*H*0.72,pulse:Math.random()*Math.PI*2,active:false});
    const conns:{a:number;b:number;t:number;alpha:number;done:boolean;badge:string}[]=[];
    let nextConn=0, t=0;
    const jobLabels=["Sr. Engineer","ML Lead","Data Sci","AI Trainer","Backend Dev","AI Annotator"];
    const draw=(ts:number)=>{
      t=ts*0.001; nextConn+=0.016;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle="#060610"; ctx.fillRect(0,0,W,H);
      // grid
      ctx.strokeStyle="rgba(251,146,60,0.05)"; ctx.lineWidth=1;
      for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      if(nextConn>1.8 && conns.length<8){
        nextConn=0;
        let a=Math.floor(Math.random()*dots.length),b=Math.floor(Math.random()*dots.length);
        if(a!==b) conns.push({a,b,t:0,alpha:0,done:false,badge:jobLabels[Math.floor(Math.random()*jobLabels.length)]});
      }
      // connections
      conns.forEach((conn,ci)=>{
        if(!conn.done){conn.t=Math.min(1,conn.t+0.014);conn.alpha=Math.min(1,conn.alpha+0.05);}
        else{conn.alpha=Math.max(0,conn.alpha-0.008); if(conn.alpha<=0)conns.splice(ci,1);}
        if(conn.t>=1) conn.done=true;
        const da=dots[conn.a],db=dots[conn.b];
        const ex=da.x+(db.x-da.x)*conn.t, ey=da.y+(db.y-da.y)*conn.t;
        ctx.save(); ctx.globalAlpha=conn.alpha*0.7;
        ctx.strokeStyle="rgba(251,146,60,0.5)"; ctx.lineWidth=1.5;
        ctx.shadowColor="rgba(251,146,60,0.5)"; ctx.shadowBlur=6;
        ctx.beginPath(); ctx.moveTo(da.x,da.y); ctx.lineTo(ex,ey); ctx.stroke();
        // pulse bead
        ctx.shadowColor="rgba(251,200,100,1)"; ctx.shadowBlur=12;
        ctx.fillStyle="rgba(255,200,100,0.95)"; ctx.beginPath(); ctx.arc(ex,ey,3,0,Math.PI*2); ctx.fill();
        ctx.restore();
        if(conn.t>=1){
          dots[conn.b].active=true;
          ctx.save(); ctx.globalAlpha=conn.alpha;
          ctx.fillStyle="rgba(15,12,24,0.95)"; ctx.strokeStyle="rgba(251,146,60,0.6)"; ctx.lineWidth=1;
          ctx.shadowColor="rgba(251,146,60,0.4)"; ctx.shadowBlur=10;
          ctx.beginPath(); ctx.roundRect(db.x+8,db.y-14,84,26,6); ctx.fill(); ctx.stroke();
          ctx.fillStyle="#fb923c"; ctx.font="bold 9px sans-serif"; ctx.textAlign="left"; ctx.textBaseline="top"; ctx.fillText("MATCH",db.x+12,db.y-11);
          ctx.fillStyle="rgba(255,255,255,0.8)"; ctx.font="10px sans-serif"; ctx.fillText(conn.badge,db.x+12,db.y+1);
          ctx.restore();
        }
      });
      // dots
      dots.forEach(d=>{
        const p=Math.sin(t*2.5+d.pulse)*0.4+0.6;
        ctx.save(); ctx.shadowColor=d.active?"rgba(251,146,60,0.9)":"rgba(251,146,60,0.3)"; ctx.shadowBlur=d.active?12:4;
        ctx.fillStyle=d.active?`rgba(251,146,60,${p})`:"rgba(251,146,60,0.25)";
        ctx.beginPath(); ctx.arc(d.x,d.y,d.active?4:2.5,0,Math.PI*2); ctx.fill();
        if(d.active){ctx.strokeStyle=`rgba(251,200,100,${p*0.5})`; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(d.x,d.y,7,0,Math.PI*2); ctx.stroke();}
        ctx.restore();
      });
      ctx.fillStyle="rgba(251,146,60,0.4)"; ctx.font="10px sans-serif"; ctx.textAlign="left"; ctx.textBaseline="top"; ctx.fillText("● Scanning Live Job Network",8,8);
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={ref} style={{width:"100%",height:"100%",display:"block"}} />;
}
