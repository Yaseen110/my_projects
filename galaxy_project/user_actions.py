from kivy.uix.relativelayout import RelativeLayout
def keyboard_closed(self):
    self.keyboard.unbind(on_key_down=self.on_keyboard_down)
    self.keyboard.unbind(on_key_up=self.on_keyboard_up)
    self.keyboard=None

def on_keyboard_down(self,keyboard,keycode,text,modifiers):
    if keycode[1]=="right":
        self.current_speed_x=-self.SPEED_x
    if keycode[1]=="left":
        self.current_speed_x=self.SPEED_x
    if keycode[1]=="up":
        self.SPEED=0.022
    return True

def on_keyboard_up(self,keyboard,keycode):
    self.current_speed_x=0
    self.SPEED=self.x
    return True

def on_touch_down(self, touch):
    if self.game_started and not self.game_over:
        if touch.x<self.width*2/5:
            self.current_speed_x=self.SPEED_x
        elif touch.x>self.width*3/5:
            self.current_speed_x=-self.SPEED_x
        else:
            self.SPEED=0.022
    # iski waja se buttons mai touch nahi ja raha isliye ham ky krenge ki super class waala function likhenge
    return super(RelativeLayout,self).on_touch_down(touch)
def on_touch_up(self, touch):
    self.current_speed_x=0
    self.SPEED=self.x
