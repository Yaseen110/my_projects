from decimal import Clamped
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.uix.button import Button
from kivy.properties import NumericProperty,ReferenceListProperty,ObjectProperty
from kivy.vector import Vector
from kivy.metrics import dp
from kivy.clock import Clock
from random import randint
# on_touch_down matlab jab touch karen
# on_touch_up matlab jab touch hatayen
# on_touch_move matlab jab drag karen
class PongPaddle(Widget):
    score=NumericProperty(0)
    def bounce_ball(self,ball):
        if self.collide_widget(ball):
            ball.velocity_x*=-1
class PongBall(Widget):
    velocity_x=NumericProperty(0)
    velocity_y=NumericProperty(0)
    velocity=ReferenceListProperty(velocity_x,velocity_y)
    def move(self):
        self.pos=Vector(*self.velocity)+self.pos

class PongGame(Widget):
    ball=ObjectProperty(None)
    player1=ObjectProperty(None)
    player2=ObjectProperty(None)
    def serve_ball(self,obj,obj2):
        obj.center=self.center
        obj2.disabled=True
        self.ball.velocity=Vector(4,0).rotate(randint(0,360))
    def update(self,dt):
        self.ball.move()
        if(self.ball.y<0 or self.ball.y+50>self.height):
            self.ball.velocity_y *=-1
        if(self.ball.x<0):
            self.ball.velocity_x *=-1
            self.player1.score+=1
        if(self.ball.x+50>self.width):
            self.player2.score+=1
            self.ball.velocity_x *=-1
        self.player1.bounce_ball(self.ball)
        self.player2.bounce_ball(self.ball)
    def reset_ball(self,obj):
        self.ball.velocity=Vector(0,0)
        obj.disabled=False
    def on_touch_move(self, touch):
        if touch.x<self.width/4:
            self.player1.center_y=touch.y
        if touch.x>self.width*3/4:
            self.player2.center_y=touch.y
    def reset_score(self,obj):
        self.player1.score=0
        self.player2.score=0

class PongApp(App):
    def build(self):
        game=PongGame()
        Clock.schedule_interval(game.update,1/60)
        return game
PongApp().run()